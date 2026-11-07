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

// [START bigquerydatapolicy_v2_datapolicyservice_datapolicy_create]

import (
	"context"
	"fmt"
	"io"
	"strings"
	"time"

	bigquerydatapolicy "cloud.google.com/go/bigquery/datapolicies/apiv2"
	"cloud.google.com/go/bigquery/datapolicies/apiv2/datapoliciespb"
)

// createDataPolicy creates a BigQuery data policy.
func createDataPolicy(ctx context.Context, w io.Writer, locationID string, dataPolicyID string, projectID string) error {
	if dataPolicyID == "" {
		dataPolicyID = fmt.Sprintf("data_policy_%d", time.Now().Unix())
	}
	dataPolicyID = strings.ReplaceAll(dataPolicyID, "-", "_")

	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	maskingPolicy := &datapoliciespb.DataMaskingPolicy{
		MaskingExpression: &datapoliciespb.DataMaskingPolicy_PredefinedExpression_{
			PredefinedExpression: datapoliciespb.DataMaskingPolicy_SHA256,
		},
	}
	dataPolicy := &datapoliciespb.DataPolicy{
		DataPolicyId:   dataPolicyID,
		DataPolicyType: datapoliciespb.DataPolicy_DATA_MASKING_POLICY,
		Policy: &datapoliciespb.DataPolicy_DataMaskingPolicy{
			DataMaskingPolicy: maskingPolicy,
		},
	}

	client, err := bigquerydatapolicy.NewDataPolicyClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataPolicyClient failed: %w", err)
	}
	defer client.Close()

	req := &datapoliciespb.CreateDataPolicyRequest{
		Parent:       parent,
		DataPolicyId: dataPolicyID,
		DataPolicy:   dataPolicy,
	}

	resp, err := client.CreateDataPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateDataPolicy failed: %w", err)
	}

	fmt.Fprintf(w, "Created data policy: %s\n", resp.GetName())

	return nil
}

// [END bigquerydatapolicy_v2_datapolicyservice_datapolicy_create]
