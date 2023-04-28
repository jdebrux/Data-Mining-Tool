import numpy as np
from collections import Counter


class Node:
    """
    A class representing a node in a decision tree.

    Attributes:
        feature (int or None): The feature index that is used for splitting at this node.
        threshold (float or None): The threshold value for the feature that is used for splitting at this node.
        left_child (Node or None): The left child node of this node.
        right_child (Node or None): The right child node of this node.
        class_label (int or None): The class label assigned to this node, if it is a leaf node.
    """

    def __init__(self, feature=None, threshold=None, left_child=None, right_child=None, *, class_label=None):
        """
        Initializes a Node object.

        Attributes:
            feature (int or None): The feature index that is used for splitting at this node.
            threshold (float or None): The threshold value for the feature that is used for splitting at this node.
            left_child (Node or None): The left child node of this node.
            right_child (Node or None): The right child node of this node.
            class_label (int or None): The class label assigned to this node, if it is a leaf node.
        """
        self.feature = feature
        self.threshold = threshold
        self.left_child = left_child
        self.right_child = right_child
        self.class_label = class_label

    def is_leaf_node(self):
        """
        Checks if this node is a leaf node.

        Returns:
            bool: True if this node is a leaf node, False otherwise.
        """
        # Check if the current node is a leaf node
        if self.class_label is None:
            # If the class label of the current node is None, it means that the current node is not a leaf node
            return False
        else:
            # If the class label of the current node is not None, it means that the current node is a leaf node
            return True



class DecisionTree:
    """ 
    A decision tree classifier for binary classification problems.

    Attributes:
        min_sample_split (int): The minimum number of samples required to split a node.
        max_depth (int): The maximum depth of the tree.
        n_features (int or None): The number of features to consider when looking for the best split. If None, all features will be considered.
        root (Node object or None): The root node of the decision tree. If the tree has not been trained yet, root will be None.
    """

    def __init__(self, min_samples_split=5, max_depth=250, n_features=None):
        self.min_sample_split = min_samples_split
        self.max_depth = max_depth
        self.n_features = n_features
        self.root = None

    def fit(self, X, y):
        """
        Fit the decision tree classifier on the training dataset.

        Parameters:
            X (numpy.ndarray): 2D array-like of shape (n_samples, n_features) containing the training samples.
            y (numpy.ndarray): 1D array-like of shape (n_samples,) containing the target values.

        Returns:
            self (DecisionTreeClassifier): Fitted decision tree classifier.
        """
        # Extract number of samples and features from training data
        n_samples, n_feats = X.shape

        # If number of features is not specified, set it to the number of features in X
        self.n_features = self.n_features or n_feats

        # Build the decision tree recursively starting from the root node
        self.root = self._build_tree(X, y, depth=0)

    def _build_tree(self, X, y, depth=0):
        """
        Recursively builds a decision tree using the ID3 algorithm.

        Parameters:
            X (numpy array): Feature matrix of shape (n_samples, n_features).
            y (numpy array): Label matrix of shape (n_samples,)
            depth (int, optional): Current depth of the tree. Used for termination criteria.

        Returns:
            root (Node): Root node of the decision tree.
        """

        # get the number of samples and features in the data
        n_samples, n_feats = X.shape

        # get the number of unique labels
        n_labels = len(np.unique(y))

        # check the stopping criteria
        if depth >= self.max_depth or n_labels == 1 or len(X) < 2*self.min_sample_split:
            # create a leaf node and assign it the most common label in y
            leaf_value = self._most_common_label(y)
            return Node(class_label=leaf_value)

        # find the best split
        best_feature, best_thresh, left_idxs, right_idxs = self._find_optimal_split(
            X, y, n_feats)

        # create child nodes
        left = self._build_tree(X[left_idxs, :], y[left_idxs], depth + 1)
        right = self._build_tree(X[right_idxs, :], y[right_idxs], depth + 1)

        # create a new node and return it
        return Node(best_feature, best_thresh, left, right)

    def _find_optimal_split(self, X, y, n_feats):
        """
        Finds the optimal split for the decision tree based on the feature and threshold that provides the highest
        information gain.

        Parameters:
        X (numpy.ndarray): The feature matrix of shape (n_samples, n_features).
        y (numpy.ndarray): The target values of shape (n_samples,).
        n_feats (int): The number of features to consider when searching for the optimal split.

        Returns:
        (tuple)
            The tuple contains four elements: (1) the index of the feature that provides the optimal split, (2) the
            threshold value of the optimal split, (3) the indices of the samples that should be assigned to the left
            node, and (4) the indices of the samples that should be assigned to the right node.
        """
        best_gain = -1
        split_idx, split_threshold = None, None
        feat_idxs = np.random.choice(n_feats, self.n_features, replace=False)

        for feat_idx in feat_idxs:
            X_column = X[:, feat_idx]
            thresholds = set(X_column)

            for thr in thresholds:
                # calculate the information gain
                gain = self._information_gain(y, X_column, thr)

                if gain > best_gain:
                    best_gain = gain
                    split_idx = feat_idx
                    split_threshold = thr

        # Get the split column from the feature matrix
        split_column = X[:, split_idx]

        # Create a boolean mask for samples that belong to the left node
        left_mask = split_column <= split_threshold

        # Create a boolean mask for samples that belong to the right node
        right_mask = split_column > split_threshold

        # Apply the masks to get the indices of the samples that belong to the left and right nodes
        left_idxs = np.where(left_mask)[0]
        right_idxs = np.where(right_mask)[0]


        return split_idx, split_threshold, left_idxs, right_idxs

    def _information_gain(self, y, X_column, thr):
        """
        Calculate the information gain of a split.

        Parameters:
            y (ndarray): An array of labels.
            X_column (ndarray): An array of feature values.
            thr (float): Threshold value to split on.

        Returns:
            information_gain (float): The information gain of the split.
        """

        # Calculate parent entropy
        parent_entropy = self._entropy(y)

        # Split data using threshold
        left_idx, right_idx = self._split(X_column, thr)

        # Check if the split is valid
        if len(left_idx) == 0 or len(right_idx) == 0:
            return 0

        # Calculate number of samples and class frequencies for the split
        n = len(y)
        n_l, n_r = len(left_idx), len(right_idx)
        hist_l = np.bincount(y[left_idx], minlength=len(np.unique(y)))
        hist_r = np.bincount(y[right_idx], minlength=len(np.unique(y)))

        # Calculate entropy for the split
        e_l = self._entropy_from_hist(hist_l, n_l)
        e_r = self._entropy_from_hist(hist_r, n_r)
        child_entropy = (n_l / n) * e_l + (n_r / n) * e_r

        # Calculate the information gain
        information_gain = parent_entropy - child_entropy
        return information_gain


    def _entropy_from_hist(self, hist, n):
        """
        Calculates entropy from histogram.

        Parameters:
            hist (numpy.ndarray): histogram of labels for a child node
            n (int): number of samples in the child node

        Returns:
            (float): entropy value
        """
        ps = hist / n
        return -np.sum([p * np.log(p) for p in ps if p > 0])


    def _split(self, X_column, split_thresh):
        """
        Splits a feature column of the data based on the split threshold.

        Parameters:
            X_column (numpy.ndarray): column of feature values for a feature
            split_thresh (float): split threshold value

        Returns:
            (tuple): tuple containing the indices of the left and right child nodes
        """
        left_idxs = np.where(X_column <= split_thresh)[0]
        right_idxs = np.where(X_column > split_thresh)[0]
        return left_idxs, right_idxs


    def _entropy(self, y):
        """
        Calculates entropy of labels.

        Parameters:
            y (numpy.ndarray): target labels of the data

        Returns:
            (float): entropy value
        """
        # sort labels in ascending order
        y_sorted = np.sort(y)

        # compute cumulative distribution function
        cdf = np.arange(1, len(y_sorted) + 1) / len(y_sorted)

        # compute horseshoe estimator for each label
        hs = 1 - cdf

        # compute entropy as sum of horseshoe estimators
        entropy = np.sum(hs)

        return entropy


    def _most_common_label(self, y):
        """
        Finds the most common label from the target labels.

        Parameters:
            y (numpy.ndarray): target labels of the data

        Returns:
            (float): the most common label value
        """
        counter = Counter(y)
        value = counter.most_common(1)[0][0]
        return value


    def predict(self, X):
        """
        Predicts the class label for a set of samples.

        Parameters:
            X (numpy.ndarray): feature values for the set of samples

        Returns:
            (numpy.ndarray): predicted class labels for the set of samples
        """
        return np.array([self._traverse_tree(x, self.root) for x in X])


    def _traverse_tree(self, x, node):
        """
        Traverses the decision tree to predict the class label for a single sample.

        Parameters:
            x (numpy.ndarray): feature values for a single sample
            node (Node): the current node in the decision tree

        Returns:
            (float): predicted class label for the sample
        """
        while not node.is_leaf_node():
            if x[node.feature] <= node.threshold:
                node = node.left_child
            else:
                node = node.right_child
        return node.class_label
