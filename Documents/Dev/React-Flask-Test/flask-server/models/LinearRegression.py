import numpy as np

# class LinearRegression:
#     def __init__(self, lr=0.00001, n_iters=1000):
#         self.lr = lr
#         self.n_iters = n_iters

#     def fit(self, X, y):
#         n_samples, n_features = X.shape
#         self.weights = np.zeros(n_features)
#         self.bias = 0

#         X_T = np.transpose(X)

#         for _ in range(self.n_iters):
#             y_pred = np.dot(X, self.weights) + self.bias
#             dw = np.dot(X_T, y_pred - y) / n_samples
#             db = np.sum(y_pred - y) / n_samples
#             self.weights -= self.lr * dw
#             self.bias -= self.lr * db

#     def predict(self, X):
#         return np.dot(X, self.weights) + self.bias


class LinearRegression:
    def fit_and_predict(self, X, y):
        """
        Perform linear regression on a pandas dataframe.

        Attributes:
            X (pandas dataframe or numpy array): feature set.
            y (pandas series or numpy array): target variable.

        Returns:
            y_pred (list): predicted target variable.
        """
        # Adding a column of ones to X
        X = np.column_stack((np.ones((len(X), 1)), X))

        # Calculating beta values
        beta = np.linalg.inv(X.T.dot(X)).dot(X.T).dot(y)

        # Calculating predicted target variable
        y_hat = X.dot(beta)

        # Converting to lists for plotting purposes
        x_values = X[:, 1].tolist()
        y_values = y.tolist()
        y_pred = y_hat.tolist()

        return y_pred
