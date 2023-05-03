import numpy as np

class LogisticRegression():
    """
    Binary logistic regression model with methods to fit and predict.

    Parameters:
        lr (float, default=0.001): Learning rate for gradient descent optimization.
        n_iters (int, default=1000): Maximum number of iterations for gradient descent optimization.
    """
    def __init__(self, lr=0.0001, n_iters=5000):
        self.lr = lr
        self.iteration_num = n_iters
        self.weights = None
        self.bias = None

    def sigmoid(self, x):
        """
        Apply the sigmoid function element-wise to the input array.

        Parameters:
            x (array-like): Input array to apply sigmoid function to.

        Returns:
            ndarray: Output array with the same shape as input array.
        """
        return 1 / (1 + np.exp(-x))

    def _compute_linear_pred(self, X):
        """
        Compute the linear prediction for the input array.

        Parameters:
            X (array-like): Input array of shape (n_samples, n_features).

        Returns:
            ndarray: Output array of shape (n_samples,).
        """
        return np.dot(X, self.weights) + self.bias

    def _compute_gradient(self, X, y, predictions):
        """
        Compute the gradient of the loss function with respect to the weights and bias.

        Parameters:
            X: (array-like): Input array of shape (n_samples, n_features).
            y: (array-like): Target array of shape (n_samples,).
            predictions (array-like): Predictions array of shape (n_samples,).

        Returns:
        tuple: Gradient of the loss function with respect to the weights and bias.
        """
        n_samples = y.shape[0]
        dw = (1 / n_samples) * np.dot(X.T, predictions - y)
        db = (1 / n_samples) * np.sum(predictions - y)
        return dw, db

    def fit(self, X, y):
        """
        Fit the logistic regression model to the input data.

        Parameters:
            X (array-like): Input array of shape (n_samples, n_features).
            y (array-like): Target array of shape (n_samples,).
        """
        self.bias = 0
        samples, features = X.shape
        self.weights = np.zeros(features)

        for i in range(self.iteration_num):
            linear_pred = self._compute_linear_pred(X)
            predictions = self.sigmoid(linear_pred)

            dw, db = self._compute_gradient(X, y, predictions)

            self.weights -= self.lr * dw
            self.bias -= self.lr * db

    def predict(self, X):
        """
        Predict the target variable using the fitted logistic regression model.

        Parameters:
            X (array-like): Input array of shape (n_samples, n_features).

        Returns:
            ndarray: Output array of predicted classes with shape (n_samples,).
        """
        linear_pred = self._compute_linear_pred(X)
        y_pred = self.sigmoid(linear_pred)
        class_pred = np.round(y_pred)
        return class_pred.tolist()

