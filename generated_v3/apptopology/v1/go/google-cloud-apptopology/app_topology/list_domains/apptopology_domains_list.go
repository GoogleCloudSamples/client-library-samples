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

// [START apptopology_v1_apptopology_domains_list]

import (
	"context"
	"fmt"
	"io"

	apptopology "cloud.google.com/go/apptopology/apiv1"
	apptopologypb "cloud.google.com/go/apptopology/apiv1/apptopologypb"
	"google.golang.org/api/iterator"
)

// listDomains lists domains in the specified project and location.
func listDomains(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := apptopology.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &apptopologypb.ListDomainsRequest{
		Parent: parent,
	}

	it := client.ListDomains(ctx, req)
	for {
		domain, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate domains: %w", err)
		}
		fmt.Fprintf(w, "Domain: %s\n", domain.GetName())
	}

	return nil
}

// [END apptopology_v1_apptopology_domains_list]
