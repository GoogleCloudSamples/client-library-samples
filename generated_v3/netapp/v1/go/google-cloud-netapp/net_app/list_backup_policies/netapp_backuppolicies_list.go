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

// [START netapp_v1_netapp_backuppolicies_list]

import (
	"context"
	"fmt"
	"io"

	netapp "cloud.google.com/go/netapp/apiv1"
	netapppb "cloud.google.com/go/netapp/apiv1/netapppb"
	"google.golang.org/api/iterator"
)

// listBackupPolicies lists NetApp backup policies in the specified project and location.
func listBackupPolicies(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := netapp.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &netapppb.ListBackupPoliciesRequest{
		Parent: parent,
	}

	it := client.ListBackupPolicies(ctx, req)
	for {
		policy, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("iteration error: %w", err)
		}
		fmt.Fprintf(w, "Backup policy: %s\n", policy.GetName())
	}

	return nil
}

// [END netapp_v1_netapp_backuppolicies_list]
