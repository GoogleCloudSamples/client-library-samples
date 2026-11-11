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

// [START analyticshub_v1beta1_analyticshubservice_dataexchange_update]

import (
	"context"
	"fmt"
	"io"

	analyticshub "cloud.google.com/go/bigquery/analyticshub/apiv1"
	analyticshubpb "cloud.google.com/go/bigquery/analyticshub/apiv1/analyticshubpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateDataExchange updates an existing data exchange's description.
func updateDataExchange(ctx context.Context, w io.Writer, projectID string, locationID string, dataExchangeID string) error {
	dataExchange := &analyticshubpb.DataExchange{
		Name:        fmt.Sprintf("projects/%s/locations/%s/dataExchanges/%s", projectID, locationID, dataExchangeID),
		Description: "Updated description for the data exchange.",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := analyticshub.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &analyticshubpb.UpdateDataExchangeRequest{
		DataExchange: dataExchange,
		UpdateMask:   updateMask,
	}

	response, err := client.UpdateDataExchange(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateDataExchange: %w", err)
	}

	fmt.Fprintf(w, "Updated data exchange: %s\n", response.GetName())
	return nil
}

// [END analyticshub_v1beta1_analyticshubservice_dataexchange_update]
