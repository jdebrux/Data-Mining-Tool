import numpy as np

class LinearRegression:

    def fit_and_predict(self, X, Y):
        """
        Perform linear regression on a pandas dataframe.

        Attributes:
            X (pandas dataframe or numpy array): feature set.
            y (pandas series or numpy array): target variable.

        Returns:
            y_pred (list): predicted target variable.
        """
        # calculate means of X and Y
        mean_x = X.mean()
        mean_y = Y.mean()
        
        # calculate variance of X and covariance of X and Y
        var_x = X.var(ddof=1)
        cov_xy = np.cov(X.squeeze(), Y.squeeze(), ddof=1)[0][1]
        
        # calculate slope and y-intercept
        slope = cov_xy / var_x
        y_intercept = mean_y - slope * mean_x
        
        # calculate predicted target variable
        y_pred = X.dot(slope) + y_intercept
        
        return y_pred.flatten().tolist(), slope, y_intercept
    
    def regression_metrics(self, y_true, y_pred):
        """
        Calculates regression evaluation metrics.

        Parameters:
            y_true (array-like): True target values.
            y_pred (array-like): Predicted target values.

        Returns:
            A dictionary of regression evaluation metrics, including:
            - mean absolute error (MAE)
            - mean squared error (MSE)
            - root mean squared error (RMSE)
            - coefficient of determination (R^2)
        """
        # calculate mean absolute error
        mae = np.mean(np.abs(y_true - y_pred))

        # calculate mean squared error
        mse = np.mean((y_true - y_pred) ** 2)

        # calculate root mean squared error
        rmse = np.sqrt(mse)

        # calculate coefficient of determination (R^2)
        ss_res = np.sum((y_true - y_pred) ** 2)
        ss_tot = np.sum((y_true - np.mean(y_true)) ** 2)
        r2 = 1 - (ss_res / ss_tot)

        # create a dictionary of regression evaluation metrics
        metrics = {'MAE': mae, 'MSE': mse, 'RMSE': rmse, 'R^2': r2}

        return metrics

