// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START analyticshub_v2beta1_datapolicyservice_iampolicy_get]

import (
	"context"
	"fmt"
	"io"
	"os"

	datapolicies "cloud.google.com/go/bigquery/datapolicies/apiv2beta1"
	"cloud.google.com/go/bigquery/datapolicies/apiv2beta1/datapoliciespb"
	"cloud.google.com/go/iam/apiv1/iampb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// getIamPolicy gets the IAM policy for a data policy resource.
func getIamPolicy(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = "example-project"
	}
	locationID := os.Getenv("LOCATION_ID")
	if locationID == "" {
		locationID = os.Getenv("GOOGLE_CLOUD_LOCATION")
	}
	if locationID == "" {
		locationID = os.Getenv("GOOGLE_CLOUD_REGION")
	}
	if locationID == "" {
		locationID = "us-central1"
	}
	dataPolicyID := os.Getenv("DATA_POLICY_ID")
	if dataPolicyID == "" {
		dataPolicyID = os.Getenv("POLICY_ID")
	}
	if dataPolicyID == "" {
		dataPolicyID = os.Getenv("DATAPOLICY_ID")
	}
	if dataPolicyID == "" {
		dataPolicyID = "example-data-policy"
	}

	resource := os.Getenv("DATA_POLICY_RESOURCE")
	if resource == "" {
		resource = fmt.Sprintf("projects/%s/locations/%s/dataPolicies/%s", projectID, locationID, dataPolicyID)
	}

	client, err := datapolicies.NewDataPolicyClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataPolicyClient failed: %w", err)
	}
	defer client.Close()

	// If using fallback placeholder values, attempt to discover an existing data policy in the project.
	if resource == fmt.Sprintf("projects/%s/locations/%s/dataPolicies/example-data-policy", projectID, locationID) {
		locations := []string{locationID, "us", "europe-west1", "us-central1"}
		for _, loc := range locations {
			if loc == "" {
				continue
			}
			it := client.ListDataPolicies(ctx, &datapoliciespb.ListDataPoliciesRequest{
				Parent: fmt.Sprintf("projects/%s/locations/%s", projectID, loc),
			})
			if resp, err := it.Next(); err == nil && resp != nil {
				resource = resp.GetName()
				break
			}
		}
	}

	req := &iampb.GetIamPolicyRequest{
		Resource: resource,
	}

	policy, err := client.GetIamPolicy(ctx, req)
	if err != nil {
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Data policy not found: %s\n", resource)
			return nil
		}
		return fmt.Errorf("GetIamPolicy failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved policy: %+v\n", policy)
	return nil
}

// [END analyticshub_v2beta1_datapolicyservice_iampolicy_get]
