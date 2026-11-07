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

// [START bigquerydatatransfer_v1_datatransferservice_check_valid_creds]

import (
	"context"
	"fmt"
	"io"

	bigquerydatatransfer "cloud.google.com/go/bigquery/datatransfer/apiv1"
	datatransferpb "cloud.google.com/go/bigquery/datatransfer/apiv1/datatransferpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// checkValidCreds checks whether valid credentials exist for a data source.
func checkValidCreds(ctx context.Context, w io.Writer, projectID string, dataSourceID string, locationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/dataSources/%s", projectID, locationID, dataSourceID)

	client, err := bigquerydatatransfer.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("bigquerydatatransfer.NewClient: %w", err)
	}
	defer client.Close()

	req := &datatransferpb.CheckValidCredsRequest{
		Name: name,
	}

	// A FailedPrecondition error indicates missing credentials or permissions for the data source.
	hasValidCreds := false
	resp, err := client.CheckValidCreds(ctx, req)
	if err != nil {
		if status.Code(err) != codes.FailedPrecondition {
			return fmt.Errorf("CheckValidCreds: %w", err)
		}
	} else {
		hasValidCreds = resp.GetHasValidCreds()
	}

	fmt.Fprintf(w, "Data source credential validity for %s: %t\n", name, hasValidCreds)
	return nil
}

// [END bigquerydatatransfer_v1_datatransferservice_check_valid_creds]
