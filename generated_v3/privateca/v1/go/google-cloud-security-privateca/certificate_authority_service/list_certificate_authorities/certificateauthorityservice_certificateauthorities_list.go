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

// [START privateca_v1_certificateauthorityservice_certificateauthorities_list]

import (
	"context"
	"fmt"
	"io"

	privateca "cloud.google.com/go/security/privateca/apiv1"
	"cloud.google.com/go/security/privateca/apiv1/privatecapb"
	"google.golang.org/api/iterator"
)

// listCertificateAuthorities lists all Certificate Authorities in the specified CA pool.
func listCertificateAuthorities(ctx context.Context, w io.Writer, projectID string, locationID string, caPoolID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/caPools/%s", projectID, locationID, caPoolID)

	client, err := privateca.NewCertificateAuthorityClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCertificateAuthorityClient failed: %w", err)
	}
	defer client.Close()

	req := &privatecapb.ListCertificateAuthoritiesRequest{
		Parent: parent,
	}

	it := client.ListCertificateAuthorities(ctx, req)
	for {
		ca, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate certificate authorities: %w", err)
		}
		fmt.Fprintf(w, "Certificate Authority: %s\n", ca.GetName())
	}

	return nil
}

// [END privateca_v1_certificateauthorityservice_certificateauthorities_list]
