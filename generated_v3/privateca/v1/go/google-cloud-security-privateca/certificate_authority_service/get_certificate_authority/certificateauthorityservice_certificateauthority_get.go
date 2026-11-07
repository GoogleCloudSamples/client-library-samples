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

// [START privateca_v1_certificateauthorityservice_certificateauthority_get]

import (
	"context"
	"fmt"
	"io"

	privateca "cloud.google.com/go/security/privateca/apiv1"
	privatecapb "cloud.google.com/go/security/privateca/apiv1/privatecapb"
)

// getCertificateAuthority retrieves an existing Certificate Authority.
func getCertificateAuthority(ctx context.Context, w io.Writer, projectID string, locationID string, caPoolID string, certificateAuthorityID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/caPools/%s/certificateAuthorities/%s", projectID, locationID, caPoolID, certificateAuthorityID)

	client, err := privateca.NewCertificateAuthorityClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCertificateAuthorityClient failed: %w", err)
	}
	defer client.Close()

	req := &privatecapb.GetCertificateAuthorityRequest{
		Name: name,
	}

	ca, err := client.GetCertificateAuthority(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetCertificateAuthority failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved Certificate Authority: %s\nState: %s\n", ca.GetName(), ca.GetState())
	return nil
}

// [END privateca_v1_certificateauthorityservice_certificateauthority_get]
