from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_iris
import pandas as pd

def random_forest(df, target_column, n_estimators=100, random_state=0):
    """
    df: pandas dataframe
    target_column: str, name of the column containing the target variable
    n_estimators: int, number of trees in the forest (default 100)
    random_state: int, seed for random number generator (default 0)
    """
    X = df.drop(target_column, axis=1)
    y = df[target_column]
    
    clf = RandomForestClassifier(n_estimators=n_estimators, random_state=random_state)
    clf.fit(X, y)
    
    return clf

def predict(clf, test_data, target_column):
    """
    clf: trained classifier
    test_data: pandas dataframe, test data
    target_column: str, name of the column containing the target variable
    """
    X_test = test_data.drop(target_column, axis=1)
    y_pred = clf.predict(X_test)
    
    return y_pred

def evaluate_model(y_true, y_pred):
    """
    y_true: array-like, true target values
    y_pred: array-like, predicted target values
    """
    accuracy = (y_true == y_pred).mean()
    return accuracy