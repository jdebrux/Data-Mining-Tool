from models.DecisionTree import DecisionTree
import numpy as np
from collections import Counter


class RandomForest:
    """
    A random forest classifier based on decision trees.

    Attributes:
        num_trees (int): The number of trees in the forest.
        max_tree_depth (int): The maximum depth of each tree in the forest.
        min_samples_for_split (int): The minimum number of samples required to split an internal node.
        num_features (int): The number of features to consider when looking for the best split. If None, all features will be considered.
        trees (list of DecisionTree objects): The trees in the random forest.
    """
    def __init__(self, num_trees=10, max_tree_depth=10, min_samples_for_split=2, num_features=None):
        """
        Initializes the random forest.

        Parameters:
            num_trees (int): The number of trees in the forest. Default is 10.
            max_tree_depth (int): The maximum depth of each tree in the forest. Default is 10.
            min_samples_for_split (int): The minimum number of samples required to split an internal node. Default is 2.
            num_features (int): The number of features to consider when looking for the best split. If None, all features will be considered. Default is None.
        """
        # Initialize hyperparameters
        self.num_trees = num_trees
        self.max_tree_depth = max_tree_depth
        self.min_samples_for_split = min_samples_for_split
        self.num_features = num_features
        self.trees = []

    def fit(self, X, y):
        """
        Fits the random forest to the training data.

        Attributes:
            X (array-like of shape (n_samples, n_features)): The training data.
            y (array-like of shape (n_samples,)): The target labels.
        """
        # Clear any existing trees and create new trees
        self.trees = []
        for _ in range(self.num_trees):
            # Create a new decision tree and fit on a bootstrapped sample of the data
            tree = DecisionTree(max_depth=self.max_tree_depth,
                                min_samples_split=self.min_samples_for_split,
                                n_features=self.num_features)
            X_sample, y_sample = self._create_bootstrap_samples(X, y)
            tree.fit(X_sample, y_sample)
            self.trees.append(tree)

    def _create_bootstrap_samples(self, X, y):
        """
        Create bootstrap samples for training each decision tree.

        Parameters:
            X (numpy.ndarray): Array of input features of shape (n_samples, n_features).
            y (numpy.ndarray): Array of labels of shape (n_samples,).

        Returns:
            tuple: A tuple containing the bootstrap samples of X and y, respectively.
        """
        # Create a bootstrapped sample of the data
        n_samples = X.shape[0]
        indices = np.arange(n_samples)
        np.random.shuffle(indices)
        indices = indices[:n_samples]
        return X[indices], y[indices]

    def _majority_vote(self, y):
        """
        Returns the label that occurs most frequently in the input array.

        Parameters:
            y (numpy.ndarray): Array of labels of shape (n_samples,).

        Returns:
            int: The label that occurs most frequently in y.
        """
        # Return the label that occurs most frequently in the array y
        unique_labels, counts = np.unique(y, return_counts=True)
        return unique_labels[np.argmax(counts)]

    def predict(self, X):
        """
        Predicts the label for each input sample using the fitted random forest.

        Parameters:
            X (numpy.ndarray): Array of input features of shape (n_samples, n_features).

        Returns:
            numpy.ndarray: Array of predicted labels of shape (n_samples,).
        """
        # Predict labels for each tree in the forest and calculate the most frequent label
        predictions = np.array([tree.predict(X) for tree in self.trees])
        tree_preds = np.swapaxes(predictions, 0, 1)
        predictions = np.array([self._majority_vote(pred)
                               for pred in tree_preds])
        return predictions
