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

// [START oracledatabase_v1_oracledatabase_minorversions_list]

import (
	"context"
	"fmt"
	"io"
	"strings"

	oracledatabase "cloud.google.com/go/oracledatabase/apiv1"
	oracledatabasepb "cloud.google.com/go/oracledatabase/apiv1/oracledatabasepb"
	"google.golang.org/api/iterator"
)

// listMinorVersions lists minor versions for a given Grid Infrastructure version.
func listMinorVersions(ctx context.Context, w io.Writer, projectID string, locationID string, giVersionID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/giVersions/%s", projectID, locationID, giVersionID)

	client, err := oracledatabase.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &oracledatabasepb.ListMinorVersionsRequest{
		Parent: parent,
	}

	it := client.ListMinorVersions(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			// Handle cases where the target Google Cloud project lacks an active Oracle Database Marketplace order/entitlement.
			if strings.Contains(err.Error(), "ENTITLEMENT_NOT_FOUND") || strings.Contains(err.Error(), "marketplace order") {
				fmt.Fprintln(w, "Oracle Database entitlement missing for project.")
				return nil
			}
			return fmt.Errorf("ListMinorVersions failed: %w", err)
		}
		fmt.Fprintf(w, "Minor version: %s\n", resp.GetName())
	}

	return nil
}

// [END oracledatabase_v1_oracledatabase_minorversions_list]
