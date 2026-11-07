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

// [START privateca_v1_certificateauthorityservice_fetch_ca_certs]

import (
	"context"
	"fmt"
	"io"

	privateca "cloud.google.com/go/security/privateca/apiv1"
	privatecapb "cloud.google.com/go/security/privateca/apiv1/privatecapb"
)

// Use the FetchCaCerts method.
func fetchCaCerts(ctx context.Context, w io.Writer, projectID string, locationID string, caPoolID string) error {
	caPool := fmt.Sprintf("projects/%s/locations/%s/caPools/%s", projectID, locationID, caPoolID)

	client, err := privateca.NewCertificateAuthorityClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCertificateAuthorityClient failed: %w", err)
	}
	defer client.Close()

	req := &privatecapb.FetchCaCertsRequest{
		CaPool: caPool,
	}

	resp, err := client.FetchCaCerts(ctx, req)
	if err != nil {
		return fmt.Errorf("FetchCaCerts failed: %w", err)
	}

	for _, certChain := range resp.GetCaCerts() {
		for _, cert := range certChain.GetCertificates() {
			fmt.Fprintf(w, "Fetched CA certificate:\n%s\n", cert)
		}
	}

	return nil
}

// [END privateca_v1_certificateauthorityservice_fetch_ca_certs]
