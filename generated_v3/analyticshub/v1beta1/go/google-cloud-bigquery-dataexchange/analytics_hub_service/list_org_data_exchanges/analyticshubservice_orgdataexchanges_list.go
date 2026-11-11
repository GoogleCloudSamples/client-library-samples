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

// [START analyticshub_v1beta1_analyticshubservice_orgdataexchanges_list]

import (
	"context"
	"fmt"
	"io"

	analyticshub "cloud.google.com/go/bigquery/dataexchange/apiv1beta1"
	"cloud.google.com/go/bigquery/dataexchange/apiv1beta1/dataexchangepb"
	"google.golang.org/api/iterator"
)

// listOrgDataExchanges lists data exchanges within a specified organization and location.
func listOrgDataExchanges(ctx context.Context, w io.Writer, organizationID string, locationID string) error {
	organization := fmt.Sprintf("organizations/%s/locations/%s", organizationID, locationID)

	client, err := analyticshub.NewAnalyticsHubClient(ctx)
	if err != nil {
		return fmt.Errorf("analyticshub.NewAnalyticsHubClient: %w", err)
	}
	defer client.Close()

	req := &dataexchangepb.ListOrgDataExchangesRequest{
		Organization: organization,
	}

	it := client.ListOrgDataExchanges(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}
		fmt.Fprintf(w, "Data exchange: %s\n", resp.GetName())
	}

	return nil
}

// [END analyticshub_v1beta1_analyticshubservice_orgdataexchanges_list]
