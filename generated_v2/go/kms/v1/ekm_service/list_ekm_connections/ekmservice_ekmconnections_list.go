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

// [START cloudkms_v1_ekmservice_ekmconnections_list]

import (
	"context"
	"fmt"
	"io"

	cloudkms "cloud.google.com/go/kms/apiv1"
	"cloud.google.com/go/kms/apiv1/kmspb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// listEkmConnections lists Cloud KMS EKM connections in a given project and location.
func listEkmConnections(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := cloudkms.NewEkmClient(ctx, option.WithQuotaProject(projectID))
	if err != nil {
		return fmt.Errorf("NewEkmClient failed: %w", err)
	}
	defer client.Close()

	req := &kmspb.ListEkmConnectionsRequest{
		Parent: parent,
	}

	it := client.ListEkmConnections(ctx, req)
	var count int
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate EKM connections: %w", err)
		}
		fmt.Fprintf(w, "EKM connection: %s\n", resp.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No EKM connections found.")
	}

	return nil
}

// [END cloudkms_v1_ekmservice_ekmconnections_list]
