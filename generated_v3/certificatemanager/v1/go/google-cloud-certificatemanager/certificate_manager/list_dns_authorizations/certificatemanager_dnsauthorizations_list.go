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

// [START certificatemanager_v1_certificatemanager_dnsauthorizations_list]

import (
	"context"
	"fmt"
	"io"

	certificatemanager "cloud.google.com/go/certificatemanager/apiv1"
	certificatemanagerpb "cloud.google.com/go/certificatemanager/apiv1/certificatemanagerpb"
	"google.golang.org/api/iterator"
)

// listDnsAuthorizations lists DNS authorizations for the specified project and location.
func listDnsAuthorizations(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := certificatemanager.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &certificatemanagerpb.ListDnsAuthorizationsRequest{
		Parent: parent,
	}

	it := client.ListDnsAuthorizations(ctx, req)
	for {
		dnsAuth, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next failed: %w", err)
		}
		fmt.Fprintf(w, "DNS Authorization: %s (domain: %s)\n", dnsAuth.GetName(), dnsAuth.GetDomain())
	}

	return nil
}

// [END certificatemanager_v1_certificatemanager_dnsauthorizations_list]
