import numpy as np
from heapq import heappush, heappushpop


def euclidean_distance(x1, x2):
    """
    Calculate the Euclidean distance between two numpy arrays

    Parameters:
        x1 (numpy.ndarray): The first input array.
        x2 (numpy.ndarray): The second input array.

    Returns:
        float: The Euclidean distance between x1 and x2.
    """
    return np.sqrt(np.einsum('i,i->', x1 - x2, x1 - x2))


class KNNClassifier:
    """
    A K-Nearest Neighbors classifier.

    Attributes:
        k (int): The number of neighbors to consider.
        X_train: The training data.
        y_train: The training labels.
    """

    def __init__(self, k=3):
        """
        Constructor for KNNClassifier class.

        Parameters:
            k (int): The number of nearest neighbors to consider for classification. Default is 3.
        """
        self.k = k

    def fit(self, X, y):
        """
        Train the KNN classifier.

        Parameters:
            X (numpy.ndarray): The training data.
            y (numpy.ndarray): The target labels.
        """
        self.X_train = X
        self.y_train = y

    def predict(self, X):
        """
        Predict the labels for the input data.

        Parameters:
            X (numpy.ndarray): The input data.

        Returns:
            list: The predicted labels for the input data.
        """
        predictions = [self._predict(x) for x in X]
        return predictions

    def _predict(self, x):
        """
        Predict the label for a single input instance.

        Parameters:
            x (numpy.ndarray): The input instance.

        Returns:
            int: The predicted label for the input instance.
        """
        # compute the distance and keep track of the k nearest neighbors
        k_nearest = []
        for i, x_train in enumerate(self.X_train):
            dist = euclidean_distance(x, x_train)
            if len(k_nearest) < self.k:
                heappush(k_nearest, (-dist, self.y_train[i]))
            else:
                heappushpop(k_nearest, (-dist, self.y_train[i]))

        # count the labels of the k nearest neighbors
        labels, counts = np.unique(
            [label for (_, label) in k_nearest], return_counts=True)

        # return the most common label
        return labels[np.argmax(counts)]
