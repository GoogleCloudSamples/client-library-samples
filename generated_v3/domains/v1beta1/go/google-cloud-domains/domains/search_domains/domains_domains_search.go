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

// [START domains_v1beta1_domains_domains_search]

import (
	"context"
	"fmt"
	"io"

	domains "cloud.google.com/go/domains/apiv1beta1"
	domainspb "cloud.google.com/go/domains/apiv1beta1/domainspb"
)

// searchDomains searches for available domain names matching a query string.
func searchDomains(ctx context.Context, w io.Writer, projectID string, locationID string, location string) error {
	query := "example.com"

	client, err := domains.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("domains.NewClient: %w", err)
	}
	defer client.Close()

	loc := locationID
	if loc == "" {
		loc = location
	}
	if loc == "" {
		loc = "global"
	}

	req := &domainspb.SearchDomainsRequest{
		Location: fmt.Sprintf("projects/%s/locations/%s", projectID, loc),
		Query:    query,
	}

	resp, err := client.SearchDomains(ctx, req)
	if err != nil {
		return fmt.Errorf("client.SearchDomains: %w", err)
	}

	for _, result := range resp.GetRegisterParameters() {
		if result.GetAvailability() == domainspb.RegisterParameters_AVAILABLE {
			fmt.Fprintf(w, "Domain: %s, Availability: %v\n", result.GetDomainName(), result.GetAvailability())
			break
		}
	}

	return nil
}

// [END domains_v1beta1_domains_domains_search]
