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