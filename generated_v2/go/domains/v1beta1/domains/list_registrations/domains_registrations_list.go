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

// [START domains_v1beta1_domains_registrations_list]

import (
	"context"
	"fmt"
	"io"

	domains "cloud.google.com/go/domains/apiv1beta1"
	domainspb "cloud.google.com/go/domains/apiv1beta1/domainspb"
	"google.golang.org/api/iterator"
)

// listRegistrations lists Cloud Domains registrations in a project and location.
func listRegistrations(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := domains.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &domainspb.ListRegistrationsRequest{
		Parent: parent,
	}

	it := client.ListRegistrations(ctx, req)
	var count int
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListRegistrations: %w", err)
		}
		fmt.Fprintf(w, "Registration: %s (domain: %s)\n", resp.GetName(), resp.GetDomainName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No registrations found.")
	}

	return nil
}

// [END domains_v1beta1_domains_registrations_list]
