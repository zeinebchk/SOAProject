import numpy as np
import pandas as pd
import seaborn as sns
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from imblearn.over_sampling import ADASYN
import pickle

df=pd.read_csv('Data4_modified.csv')
# import matplotlib.pyplot as plt
X=df.drop(columns=["Churn","SeniorCitizen"])
y=df["Churn"]
adasyn = ADASYN(random_state=42)
X_ad, y_ad = adasyn.fit_resample(X, y)

# Assuming X_ad and y_ad are already defined from the previous code
X_train, X_test, y_train, y_test = train_test_split(X_ad, y_ad, test_size=0.2, random_state=42)

# Initialize and train the Random Forest Classifier
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)  # You can adjust n_estimators
rf_model.fit(X_train, y_train)

# # Make predictions on the test set
y_pred_rf = rf_model.predict(X_test)

# # Evaluate the model
accuracy_rf = accuracy_score(y_test, y_pred_rf)
print(f"Random Forest Accuracy: {accuracy_rf}")

# # Print classification report
# print(classification_report(y_test, y_pred_rf))

# # Compute confusion matrix
# conf_matrix_rf = confusion_matrix(y_test, y_pred_rf)
# print("Random Forest Confusion Matrix:")
# print(conf_matrix_rf)


pickle.dump(rf_model,open("model.pkl","wb"))
