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

// [START networksecurity_v1_networksecurity_clienttlspolicies_list]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1beta1"
	"cloud.google.com/go/networksecurity/apiv1beta1/networksecuritypb"
	"google.golang.org/api/iterator"
)

// listClientTlsPolicies lists client TLS policies in a given project and location.
func listClientTlsPolicies(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := networksecurity.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.ListClientTlsPoliciesRequest{
		Parent: parent,
	}

	it := client.ListClientTlsPolicies(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListClientTlsPolicies failed: %w", err)
		}
		fmt.Fprintf(w, "Client TLS Policy: %s\n", resp.GetName())
	}

	return nil
}

// [END networksecurity_v1_networksecurity_clienttlspolicies_list]
