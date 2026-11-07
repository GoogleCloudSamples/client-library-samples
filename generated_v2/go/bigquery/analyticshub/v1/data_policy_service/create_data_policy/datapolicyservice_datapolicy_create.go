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

// [START analyticshub_v1_datapolicyservice_datapolicy_create]

import (
	"context"
	"fmt"
	"io"
	"os"

	datapolicies "cloud.google.com/go/bigquery/datapolicies/apiv1"
	"cloud.google.com/go/bigquery/datapolicies/apiv1/datapoliciespb"
)

// createDataPolicy creates a data policy using the CreateDataPolicy method.
func createDataPolicy(ctx context.Context, w io.Writer, locationID string) error {
	projectNumber := os.Getenv("GOOGLE_CLOUD_PROJECT_NUMBER")
	if projectNumber == "" {
		projectNumber = os.Getenv("GOOGLE_CLOUD_PROJECT")
	}
	if projectNumber == "" {
		projectNumber = "example-project-number"
	}
	parent := fmt.Sprintf("projects/%s/locations/%s", projectNumber, locationID)

	policyTag := os.Getenv("POLICY_TAG")
	if policyTag == "" {
		policyTag = fmt.Sprintf("projects/%s/locations/%s/taxonomies/example-taxonomy/policyTags/example-policy-tag", projectNumber, locationID)
	}

	dataPolicyID := os.Getenv("DATA_POLICY_ID")
	if dataPolicyID == "" {
		dataPolicyID = "example_data_policy"
	}

	maskingPolicy := &datapoliciespb.DataMaskingPolicy{
		MaskingExpression: &datapoliciespb.DataMaskingPolicy_PredefinedExpression_{
			PredefinedExpression: datapoliciespb.DataMaskingPolicy_SHA256,
		},
	}
	dataPolicy := &datapoliciespb.DataPolicy{
		DataPolicyId:   dataPolicyID,
		DataPolicyType: datapoliciespb.DataPolicy_DATA_MASKING_POLICY,
		MatchingLabel: &datapoliciespb.DataPolicy_PolicyTag{
			PolicyTag: policyTag,
		},
		Policy: &datapoliciespb.DataPolicy_DataMaskingPolicy{
			DataMaskingPolicy: maskingPolicy,
		},
	}

	client, err := datapolicies.NewDataPolicyClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataPolicyClient: %w", err)
	}
	defer client.Close()

	req := &datapoliciespb.CreateDataPolicyRequest{
		Parent:     parent,
		DataPolicy: dataPolicy,
	}

	resp, err := client.CreateDataPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateDataPolicy: %w", err)
	}

	fmt.Fprintf(w, "Created data policy: %s\n", resp.GetName())
	return nil
}

// [END analyticshub_v1_datapolicyservice_datapolicy_create]
