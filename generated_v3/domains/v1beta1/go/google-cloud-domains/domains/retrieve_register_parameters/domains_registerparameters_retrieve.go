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

// [START domains_v1beta1_domains_retrieve_register_parameters]

import (
	"context"
	"fmt"
	"io"

	domains "cloud.google.com/go/domains/apiv1beta1"
	domainspb "cloud.google.com/go/domains/apiv1beta1/domainspb"
)

// retrieveRegisterParameters retrieves registration parameters for a domain name.
func retrieveRegisterParameters(ctx context.Context, w io.Writer, projectID string, locationID string, domainName string) error {
	location := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := domains.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("domains.NewClient: %w", err)
	}
	defer client.Close()

	req := &domainspb.RetrieveRegisterParametersRequest{
		Location:   location,
		DomainName: domainName,
	}

	resp, err := client.RetrieveRegisterParameters(ctx, req)
	if err != nil {
		return fmt.Errorf("RetrieveRegisterParameters: %w", err)
	}

	params := resp.GetRegisterParameters()
	fmt.Fprintf(w, "Domain: %s\n", params.GetDomainName())

	var availability string
	switch params.GetAvailability() {
	case domainspb.RegisterParameters_AVAILABLE:
		availability = "Available"
	case domainspb.RegisterParameters_UNAVAILABLE:
		availability = "Not available"
	case domainspb.RegisterParameters_UNSUPPORTED:
		availability = "Unsupported"
	default:
		availability = "Unspecified"
	}
	fmt.Fprintf(w, "Availability: %s\n", availability)

	if price := params.GetYearlyPrice(); price != nil {
		fmt.Fprintf(w, "Yearly price: %d %s\n", price.GetUnits(), price.GetCurrencyCode())
	}

	return nil
}

// [END domains_v1beta1_domains_retrieve_register_parameters]
