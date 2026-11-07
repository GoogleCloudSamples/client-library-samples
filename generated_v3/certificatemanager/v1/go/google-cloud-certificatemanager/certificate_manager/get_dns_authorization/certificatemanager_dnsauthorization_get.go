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

// [START certificatemanager_v1_certificatemanager_dnsauthorization_get]

import (
	"context"
	"fmt"
	"io"

	certificatemanager "cloud.google.com/go/certificatemanager/apiv1"
	certificatemanagerpb "cloud.google.com/go/certificatemanager/apiv1/certificatemanagerpb"
)

// getDnsAuthorization retrieves a DNS authorization.
func getDnsAuthorization(ctx context.Context, w io.Writer, projectID string, locationID string, dnsAuthorizationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/dnsAuthorizations/%s", projectID, locationID, dnsAuthorizationID)

	client, err := certificatemanager.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("certificatemanager.NewClient: %w", err)
	}
	defer client.Close()

	req := &certificatemanagerpb.GetDnsAuthorizationRequest{
		Name: name,
	}

	resp, err := client.GetDnsAuthorization(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetDnsAuthorization: %w", err)
	}

	fmt.Fprintf(w, "Retrieved DNS authorization: %s\n", resp.GetName())
	return nil
}

// [END certificatemanager_v1_certificatemanager_dnsauthorization_get]
