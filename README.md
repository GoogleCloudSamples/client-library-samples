# Google Cloud API Code Samples

This repository contains code examples that demonstrate how to interact with Google Cloud Services. Many examples found here are directly injected into the [Google Cloud documentation](https://docs.cloud.google.com/docs).

## How this repository is organized

The samples are organized hierarchically by **Product**, **Service Version**, and **Programming Language**:

`{Product} / {Service Version} / {Language} / {Client Library Name}`

For example:
- `bigqueryconnection/v1/python/google-cloud-bigquery-connection/`
- `bigquerydatapolicy/v2/nodejs/google-cloud-bigquery-datapolicies/`

Each directory typically contains standalone scripts or snippets demonstrating specific API methods (e.g., creating a connection, listing policies).

## How to invoke this Code

Each language directory typically contains its own dependency files (e.g., `requirements.txt` for Python, `package.json` for Node.js).

### Prerequisites

1.  **Google Cloud Project**: You need a Google Cloud project with the relevant APIs enabled.
2.  **Authentication**: These samples use [Application Default Credentials (ADC)](https://cloud.google.com/docs/authentication/provide-credentials-adc) for authentication.
    *   For local development, you can run: `gcloud auth application-default login`

### Running a Sample

**Python:**
1.  Navigate to the sample directory.
2.  Install dependencies: `pip install -r requirements.txt`


**Node.js:**
1.  Navigate to the sample directory.
2.  Install dependencies: `npm install`


## Note

⚠️ **Important:** Please be mindful when running these examples.

*   **Billing**: Running these samples may incur costs in your Google Cloud project.
*   **Data Impact**: Some examples may **create**, **modify**, or **delete** real resources (such as datasets, connections, or policies). Always review the code before execution to prevent unintended data loss or infrastructure changes.
*   **Cleanup**: Remember to delete any resources created during testing to avoid ongoing charges.

## Contributing

We welcome contributions! Whether you're fixing a bug, improving documentation, or adding a new sample, your help is appreciated.

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests. We want to make contributing as easy and positive as possible.

## Requests

If you have a request for a new sample or find an issue with an existing one, please open an issue in this repository. Be sure to provide details about the specific API and use case you are interested in.