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

// [START managedidentities_v1_managedidentitiesservice_domains_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	managedidentities "cloud.google.com/go/managedidentities/apiv1"
	"cloud.google.com/go/managedidentities/apiv1/managedidentitiespb"
	"google.golang.org/api/iterator"
)

// listDomains lists Active Directory domains managed in the specified project.
func listDomains(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s/locations/global", projectID)

	client, err := managedidentities.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("managedidentities.NewClient: %w", err)
	}
	defer client.Close()

	req := &managedidentitiespb.ListDomainsRequest{
		Parent: parent,
	}

	it := client.ListDomains(ctx, req)
	for {
		domain, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("ListDomains: %w", err)
		}

		fmt.Fprintf(w, "Domain: %s (FQDN: %s)\n", domain.GetName(), domain.GetFqdn())
	}

	return nil
}

// [END managedidentities_v1_managedidentitiesservice_domains_list]
