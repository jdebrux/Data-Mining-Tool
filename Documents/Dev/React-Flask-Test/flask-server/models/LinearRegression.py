import numpy as np

class LinearRegression:
    def __init__(self, lr=0.00001, n_iters=1000):
        self.lr = lr
        self.n_iters = n_iters

    def fit(self, X, y):
        n_samples, n_features = X.shape
        self.weights = np.zeros(n_features)
        self.bias = 0

        X_T = np.transpose(X)

        for _ in range(self.n_iters):
            y_pred = np.dot(X, self.weights) + self.bias
            dw = np.dot(X_T, y_pred - y) / n_samples
            db = np.sum(y_pred - y) / n_samples
            self.weights -= self.lr * dw
            self.bias -= self.lr * db

    def predict(self, X):
        return np.dot(X, self.weights) + self.bias
