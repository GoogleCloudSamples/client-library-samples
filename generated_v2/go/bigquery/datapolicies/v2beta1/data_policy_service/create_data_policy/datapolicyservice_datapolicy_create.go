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

// [START bigquerydatapolicy_v2beta1_datapolicyservice_datapolicy_create]

import (
	"context"
	"fmt"
	"io"

	bigquerydatapolicy "cloud.google.com/go/bigquery/datapolicies/apiv2beta1"
	"cloud.google.com/go/bigquery/datapolicies/apiv2beta1/datapoliciespb"
)

// createDataPolicy creates a data masking policy in BigQuery.
func createDataPolicy(ctx context.Context, w io.Writer, locationID string, dataPolicyID string, projectID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	dataPolicy := &datapoliciespb.DataPolicy{
		DataPolicyType: datapoliciespb.DataPolicy_DATA_MASKING_POLICY,
		Policy: &datapoliciespb.DataPolicy_DataMaskingPolicy{
			DataMaskingPolicy: &datapoliciespb.DataMaskingPolicy{
				MaskingExpression: &datapoliciespb.DataMaskingPolicy_PredefinedExpression_{
					PredefinedExpression: datapoliciespb.DataMaskingPolicy_SHA256,
				},
			},
		},
	}

	client, err := bigquerydatapolicy.NewDataPolicyClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataPolicyClient: %w", err)
	}
	defer client.Close()

	req := &datapoliciespb.CreateDataPolicyRequest{
		Parent:       parent,
		DataPolicyId: dataPolicyID,
		DataPolicy:   dataPolicy,
	}

	resp, err := client.CreateDataPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateDataPolicy: %w", err)
	}

	fmt.Fprintf(w, "Created data policy: %s\n", resp.GetName())
	return nil
}

// [END bigquerydatapolicy_v2beta1_datapolicyservice_datapolicy_create]
