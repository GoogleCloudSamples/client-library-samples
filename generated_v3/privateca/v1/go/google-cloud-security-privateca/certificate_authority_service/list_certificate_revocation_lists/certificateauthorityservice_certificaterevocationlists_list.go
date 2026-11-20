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

// [START privateca_v1_certificateauthorityservice_certificaterevocationlists_list]

import (
	"context"
	"fmt"
	"io"

	privateca "cloud.google.com/go/security/privateca/apiv1"
	"cloud.google.com/go/security/privateca/apiv1/privatecapb"
	"google.golang.org/api/iterator"
)

// listCertificateRevocationLists lists the certificate revocation lists (CRLs) for a Certificate Authority.
func listCertificateRevocationLists(ctx context.Context, w io.Writer, projectID string, locationID string, caPoolID string, certificateAuthorityID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/caPools/%s/certificateAuthorities/%s", projectID, locationID, caPoolID, certificateAuthorityID)

	client, err := privateca.NewCertificateAuthorityClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCertificateAuthorityClient: %w", err)
	}
	defer client.Close()

	req := &privatecapb.ListCertificateRevocationListsRequest{
		Parent: parent,
	}

	it := client.ListCertificateRevocationLists(ctx, req)
	var count int
	for {
		crl, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to list certificate revocation lists: %w", err)
		}
		fmt.Fprintf(w, "- %s (state: %s)\n", crl.GetName(), crl.GetState())
		count++
	}
	if count == 0 {
		fmt.Fprintln(w, "No certificate revocation lists found.")
	}

	return nil
}

// [END privateca_v1_certificateauthorityservice_certificaterevocationlists_list]
