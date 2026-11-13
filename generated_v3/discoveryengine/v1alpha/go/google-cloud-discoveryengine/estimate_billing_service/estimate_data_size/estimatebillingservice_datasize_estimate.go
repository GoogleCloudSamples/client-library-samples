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

// [START discoveryengine_v1alpha_estimatebillingservice_estimate_data_size]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1alpha"
	"cloud.google.com/go/discoveryengine/apiv1alpha/discoveryenginepb"
)

// estimateDataSize estimates the data size for website content.
func estimateDataSize(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	location := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	websiteDataSource := &discoveryenginepb.EstimateDataSizeRequest_WebsiteDataSource{
		EstimatorUriPatterns: []*discoveryenginepb.EstimateDataSizeRequest_WebsiteDataSource_EstimatorUriPattern{
			{
				ProvidedUriPattern: "https://example.com/*",
			},
		},
	}

	client, err := discoveryengine.NewEstimateBillingClient(ctx)
	if err != nil {
		return fmt.Errorf("NewEstimateBillingClient: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.EstimateDataSizeRequest{
		Location: location,
		DataSource: &discoveryenginepb.EstimateDataSizeRequest_WebsiteDataSource_{
			WebsiteDataSource: websiteDataSource,
		},
	}

	op, err := client.EstimateDataSize(ctx, req)
	if err != nil {
		return fmt.Errorf("EstimateDataSize: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Data size bytes: %d\n", resp.GetDataSizeBytes())
	fmt.Fprintf(w, "Document count: %d\n", resp.GetDocumentCount())

	return nil
}

// [END discoveryengine_v1alpha_estimatebillingservice_estimate_data_size]
