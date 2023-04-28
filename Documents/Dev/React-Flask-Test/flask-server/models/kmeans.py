import numpy as np
import matplotlib.pyplot as plt


def euclidean_distance(x1, x2):
    return np.sqrt(np.sum((x1 - x2) ** 2))


class KMeansCluster:
    """
    K-Means clustering class.

    Attributes:
        K (int): The number of clusters to form.
        max_iters (int): The maximum number of iterations to run the algorithm.
    """

    def __init__(self, K=5, max_iters=100):
        """
        Initialize KMeansCluster with K and max_iters.

        Parameters:
            K (int, default: 5): The number of clusters to form.
            max_iters (int, default: 100): The maximum number of iterations to run the algorithm.
        """
        self.K = K
        self.max_iters = max_iters

        # list of sample indices for each cluster
        self.clusters = [[] for _ in range(self.K)]

        # the centers (mean vector) for each cluster
        self.centroids = []

    def predict(self, X):
        self.X = X
        self.n_samples, self.n_features = X.shape

        # initialize with KMeans++ initialization
        self.centroids = self._kmeans_plus_plus()

        # optimize clusters
        self._optimize_clusters()

        # classify samples as the index of their clusters
        return self._get_cluster_labels(self.clusters)

    def _optimize_clusters(self):
        i = 0
        while i < self.max_iters:
            # assign samples to closest centroids (create clusters)
            self.clusters = self._form_clusters(self.centroids)

            # calculate new centroids from the clusters
            centroids_old = self.centroids
            self.centroids = self._create_new_centroids(self.clusters)

            if self._is_converged(centroids_old, self.centroids):
                break
            i += 1

    def _kmeans_plus_plus(self):
        """
        Initialize the centroids with KMeans++ initialization.

        Returns:
            numpy array: The initialized centroids.
        """
        # initialize the centroids with KMeans++ initialization
        centroids = [self.X[np.random.randint(self.n_samples)]]

        for i in range(1, self.K):
            # calculate euclidean distances to the nearest centroid for each sample
            distances = np.array(
                [min([euclidean_distance(x, c) for c in centroids]) for x in self.X])

            # choose the next centroid based on the distances
            probabilities = distances / distances.sum()
            centroid_idx = np.random.choice(self.n_samples, p=probabilities)
            centroids.append(self.X[centroid_idx])

        return np.array(centroids)

    def _get_cluster_labels(self, clusters):
        """
        Assign labels to samples based on the cluster they belong to.

        Parameters:
            clusters (list): A list of clusters where each cluster is a list of sample indices.

        Returns:
            numpy.ndarray: An array of shape (n_samples,) containing the labels for each sample.
        """
        # each sample will get the label of the cluster it was assigned to
        labels = np.empty(self.n_samples)
        for cluster_idx, cluster in enumerate(clusters):
            for sample_idx in cluster:
                labels[sample_idx] = cluster_idx

        return labels

    def _form_clusters(self, centroids):
        """
        Assign samples to the closest centroids.

        Parameters:
            centroids (numpy.ndarray): An array of shape (K, n_features) containing the current centroids.

        Returns:
            list: A list of clusters where each cluster is a list of sample indices.
        """
        # compute euclidian distances between samples and centroids
        distances = np.sqrt(((self.X[:, np.newaxis, :] - centroids)**2).sum(axis=2))

        # assign samples to closest centroids
        closest_centroids = np.argmin(distances, axis=1)
        clusters = [[] for _ in range(self.K)]
        for idx, centroid_idx in enumerate(closest_centroids):
            clusters[centroid_idx].append(idx)
        return clusters

    def _create_new_centroids(self, clusters):
        """
        Calculate the new centroids based on the samples in each cluster.

        Parameters:
            clusters (list): A list of clusters where each cluster is a list of sample indices.

        Returns:
            numpy.ndarray: An array of shape (K, n_features) containing the new centroids.
        """
        # assign mean value of clusters to centroids
        centroids = np.zeros((self.K, self.n_features))
        for cluster_idx, cluster in enumerate(clusters):
            if len(cluster) == 0:
                # if a cluster is empty, keep the old centroid
                centroids[cluster_idx] = self.centroids[cluster_idx]
            else:
                # use vectorized computations to calculate the cluster mean
                centroids[cluster_idx] = np.mean(self.X[cluster], axis=0)

        return centroids

    def _is_converged(self, centroids_old, centroids):
        """
        Check if the algorithm has converged by comparing the old and new centroids.

        Parameters:
            centroids_old (numpy.ndarray): An array of shape (K, n_features) containing the centroids from the previous iteration.
            centroids (numpy.ndarray): An array of shape (K, n_features) containing the new centroids.

        Returns:
            bool: True if the algorithm has converged, False otherwise.
        """
        # distances between old and new centroids, for all centroids
        distances = [euclidean_distance(
            centroids_old[i], centroids[i]) for i in range(self.K)]
        return sum(distances) == 0

    def plot(self):
        """
        Plot the clusters and their centroids.

        Returns:
            tuple: A tuple containing a list of cluster points and a tuple of centroid points.
        """
        # Initialize empty lists to store cluster points and centroid coordinates
        cluster_points = []
        centroid_points_x = []
        centroid_points_y = []

        # Iterate over each cluster and add its points to the cluster_points list
        for i, index in enumerate(self.clusters):
            # Transpose the points to separate their x and y coordinates
            point = self.X[index].T
            cluster_points.append(point.tolist())

        # Iterate over each centroid and add its x and y coordinates to the centroid_points_x and centroid_points_y lists
        for point in self.centroids:
            centroid_points_x.append(point[0])
            centroid_points_y.append(point[1])

        # Return a tuple containing the cluster_points and the tuple of centroid points
        return cluster_points, (centroid_points_x, centroid_points_y)
