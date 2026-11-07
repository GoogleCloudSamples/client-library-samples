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

// [START analyticshub_v1_datatransferservice_check_valid_creds]

import (
	"context"
	"fmt"
	"io"

	datatransfer "cloud.google.com/go/bigquery/datatransfer/apiv1"
	"cloud.google.com/go/bigquery/datatransfer/apiv1/datatransferpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// checkValidCreds checks whether valid credentials exist for the specified data source.
func checkValidCreds(ctx context.Context, w io.Writer, projectID string, dataSourceID string) error {
	name := fmt.Sprintf("projects/%s/dataSources/%s", projectID, dataSourceID)

	client, err := datatransfer.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("datatransfer.NewClient: %w", err)
	}
	defer client.Close()

	req := &datatransferpb.CheckValidCredsRequest{
		Name: name,
	}

	resp, err := client.CheckValidCreds(ctx, req)
	if err != nil {
		// A FailedPrecondition status indicates that valid credentials or permissions do not exist.
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Valid credentials: false\n")
			return nil
		}
		return fmt.Errorf("CheckValidCreds: %w", err)
	}

	fmt.Fprintf(w, "Valid credentials: %t\n", resp.GetHasValidCreds())

	return nil
}

// [END analyticshub_v1_datatransferservice_check_valid_creds]
