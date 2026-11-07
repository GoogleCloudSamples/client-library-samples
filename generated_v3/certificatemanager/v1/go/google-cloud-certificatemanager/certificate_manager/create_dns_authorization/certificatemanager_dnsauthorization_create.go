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

// [START certificatemanager_v1_certificatemanager_dnsauthorization_create]

import (
	"context"
	"fmt"
	"io"

	certificatemanager "cloud.google.com/go/certificatemanager/apiv1"
	certificatemanagerpb "cloud.google.com/go/certificatemanager/apiv1/certificatemanagerpb"
)

// createDnsAuthorization provisions a new DNS authorization for certificate issuance.
func createDnsAuthorization(ctx context.Context, w io.Writer, projectID string, locationID string, dnsAuthorizationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	dnsAuthorization := &certificatemanagerpb.DnsAuthorization{
		Domain: fmt.Sprintf("%s.example.com", dnsAuthorizationID),
	}

	client, err := certificatemanager.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &certificatemanagerpb.CreateDnsAuthorizationRequest{
		Parent:             parent,
		DnsAuthorizationId: dnsAuthorizationID,
		DnsAuthorization:   dnsAuthorization,
	}

	op, err := client.CreateDnsAuthorization(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateDnsAuthorization failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created DNS authorization: %s\n", resp.GetName())
	return nil
}

// [END certificatemanager_v1_certificatemanager_dnsauthorization_create]
