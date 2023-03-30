def linear_regression(df):
    """Perform linear regression on a pandas dataframe"""
    X = df.iloc[:, 1:].values
    y = df.iloc[:, 0].values
    X = np.column_stack((np.ones((len(X), 1)), X))
    beta = np.linalg.inv(X.T.dot(X)).dot(X.T).dot(y)
    y_hat = X.dot(beta)

    x_values = X[:, 1].tolist()
    y_values = y.tolist()
    y_pred_values = y_hat.tolist()

    results = {
        "x_values": x_values,
        "y_values": y_values,
        "y_pred_values": y_pred_values
    }
    return results

    # class LinearRegression:

#     def __init__(self, lr=0.01, n_iters=1000, alpha=0.001):
#         self.lr = lr
#         self.n_iters = n_iters
#         self.alpha = alpha
#         self.weights = None
#         self.bias = None

#     def fit(self, X, y):
#         n_samples, n_features = X.shape
#         self.weights = np.zeros(n_features)
#         self.bias = 0

#         for _ in range(self.n_iters):
#             y_pred = np.dot(X, self.weights) + self.bias
#             dw = (1 / n_samples) * np.dot(X.T, (y_pred - y)) + (self.alpha / n_samples) * self.weights
#             db = (1 / n_samples) * np.sum(y_pred - y)

#             self.weights = self.weights - self.lr * dw
#             self.bias = self.bias - self.lr * db

#     def predict(self, X):
#         y_pred = np.dot(X, self.weights) + self.bias
#         return y_pred


# class LinearRegression:

#     def __init__(self, lr=0.00001, n_iters=1000):
#         self.lr = lr
#         self.n_iters = n_iters
#         self.weights = None
#         self.bias = None

#     def fit(self, X, y):
#         n_samples, n_features = X.shape
#         self.weights = np.zeros(n_features)
#         self.bias = 0

#         for _ in range(self.n_iters):
#             y_pred = np.dot(X, self.weights) + self.bias
#             dw = (1 / n_samples) * np.dot(X.T, (y_pred - y))
#             db = (1 / n_samples) * np.sum(y_pred - y)
#             self.weights = self.weights - self.lr * dw
#             self.bias = self.bias - self.lr * db

#     def predict(self, X):
#         y_pred = np.dot(X, self.weights) + self.bias
#         return y_pred