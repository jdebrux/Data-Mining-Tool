from flask import Flask, render_template, url_for, request, redirect, send_from_directory, jsonify
from datetime import datetime
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report
import matplotlib.pyplot as plt
from flask_cors import CORS
import os
import io
import pandas as pd

from models.LinearRegression import LinearRegression
from models.DecisionTree import DecisionTree
from models.RandomForest import RandomForest
from models.LogisticRegression import LogisticRegression
from models.KNN import KNNClassifier
from models.kmeans import KMeansCluster


app = Flask(__name__)
CORS(app)

# define allowed extensions for file uploads
ALLOWED_EXTENSIONS = {'csv'}


def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def file_to_dataframe(file):
    if file and allowed_file(file.filename):
        file = file.read()
        df = pd.read_csv(io.StringIO(file.decode()), dtype='category')
        cat_columns = df.select_dtypes(['category']).columns
        df[cat_columns] = df[cat_columns].apply(lambda x: x.cat.codes)
        return df
    return None


def get_feature_headers(file):
    """
    file: werkzeug.datastructures.FileStorage, the file to extract feature headers from
    """
    try:
        df = pd.read_csv(file)
        features = df.columns.tolist()
        return features
    except (pd.errors.EmptyDataError, pd.errors.ParserError):
        return "File is empty or cannot be parsed."


# ROUTES
# --------------------------- GET FEATURES ---------------------------#
@app.route('/GetFeatures', methods=['GET', 'POST'])
def getFeatures():
    if request.method == 'POST':
        file = request.files['file']
        return get_feature_headers(file)
    return file.filename

# --------------------------- LINEAR REGRESSION ---------------------------#

@app.route('/LinearRegression', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        target = request.form['selectedItem'].strip('\"')
        file = request.files['file']
        df = file_to_dataframe(file)
        return linearRegressionTrain(df, target)
    return file.filename


def mse(y_test, predictions):
    return np.mean((y_test - predictions) ** 2)


def linearRegressionTrain(df, target):
    X = df.loc[:, df.columns != target].values
    y = df[target].values

    reg = LinearRegression()
    y_pred_line, slope, y_intercept = reg.fit_and_predict(X, y)

    metrics = reg.regression_metrics(y,y_pred_line)

    return jsonify({"predictions": y_pred_line, "X": X.flatten().tolist(), "y":y.flatten().tolist(), "slope":slope , "intercept":y_intercept, "metrics":metrics})

# --------------------------- RANDOM FOREST ---------------------------#
@app.route('/RandomForest', methods=['GET', 'POST'])
def randomForest():
    if request.method == 'POST':
        target = request.form['selectedItem'].replace('"', '')
        file = request.files['file']
        df = file_to_dataframe(file)
        return randomForestTrain(df, target)
    return file.filename


def randomForestTrain(df, target):
    X = df.loc[:, df.columns != target].values
    y = df[target].values

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=1234)

    def accuracy(y_test, y_pred):
        return np.sum(y_test == y_pred) / len(y_test)

    clf = RandomForest(num_trees=10, max_tree_depth=1000, min_samples_for_split=6)
    clf.fit(X_train, y_train)
    predictions = clf.predict(X_test)

    acc = accuracy(y_test, predictions)
    print(acc)
    actual = y_test.flatten().tolist()
    report = classification_report(actual, predictions.tolist(), output_dict=True)['weighted avg']

    # Return response
    return jsonify({"actual":actual, "predictions": predictions.tolist(), "report": report})

# --------------------------- LOGISTIC REGRESSION ---------------------------#


@app.route('/LogisticRegression', methods=['GET', 'POST'])
def logisticRegression():
    if request.method == 'POST':
        target = request.form['selectedItem'].replace('"', '')
        file = request.files['file']
        df = file_to_dataframe(file)
        return logisticRegressionTrain(df, target)
    return file.filename

def logisticRegressionTrain(df, target):
    X = df.loc[:, df.columns != target].values
    y = df[target].values

    scaler = StandardScaler()
    X = scaler.fit_transform(X)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=1234)

    clf = LogisticRegression(lr=0.01, n_iters=1000)
    clf.fit(X_train, y_train)
    predictions = clf.predict(X_test)

    def accuracy(y_pred, y_test):
        return np.sum(y_pred == y_test) / len(y_test)

    acc = accuracy(predictions, y_test)

    actual = y_test.flatten().tolist()
    print(classification_report(actual, predictions))
    report = classification_report(actual, predictions, output_dict=True)['weighted avg']

    # Return response
    return jsonify({"actual":actual, "predictions": predictions, "report": report})


# --------------------------- KNN ---------------------------#

@app.route('/KNN', methods=['GET', 'POST'])
def KNN():
    if request.method == 'POST':
        target = request.form['selectedItem'].replace('"', '')
        file = request.files['file']
        df = file_to_dataframe(file)
        return KNNTrain(df, target)
    return file.filename


def KNNTrain(df, target):
    X = df.loc[:, df.columns != target].values
    y = df[target].values

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=1234)
    clf = KNNClassifier(k=10)
    clf.fit(X_train, y_train)
    predictions = clf.predict(X_test)

    acc = np.sum(predictions == y_test) / len(y_test)

    # Convert int8 values in predictions to int
    predictions = [int(pred) for pred in predictions]
    actual = y_test.flatten().tolist()
    report = classification_report(actual, predictions, output_dict=True)['weighted avg']

    # Return response
    return jsonify({"actual":actual, "predictions": predictions, "report": report})
    

# --------------------------- KMeans ---------------------------#


@app.route('/KMeans', methods=['GET', 'POST'])
def KMeans():
    if request.method == 'POST':
        target = request.form['selectedItem'].replace('"', '')
        file = request.files['file']
        df = file_to_dataframe(file)
        return KMeansTrain(df, target)
    return file.filename
    
def KMeansTrain(df, target):
    X = df.loc[:, df.columns != target].values

    n_clusters = len(np.unique(df[target]))
    print(n_clusters)

    k = KMeansCluster(K=n_clusters, max_iters=250)
    y_pred = k.predict(X)

    # Get the centroids of the clusters
    centroids = k.centroids.tolist()
    clusters = k.clusters

    cluster_points, centroid_points = k.plot()

    # Return the cluster assignments and centroids as a JSON response
    return jsonify({"clusters": cluster_points, "centroids": centroid_points})




if __name__ == "__main__":
    app.run(debug=True)
