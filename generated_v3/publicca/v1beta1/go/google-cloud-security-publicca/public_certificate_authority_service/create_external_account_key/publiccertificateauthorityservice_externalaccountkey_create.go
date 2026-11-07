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

// [START publicca_v1beta1_publiccertificateauthorityservice_externalaccountkey_create]

import (
	"context"
	"fmt"
	"io"

	publicca "cloud.google.com/go/security/publicca/apiv1beta1"
	publiccapb "cloud.google.com/go/security/publicca/apiv1beta1/publiccapb"
)

// createExternalAccountKey generates a new ACME External Account Binding (EAB) key.
func createExternalAccountKey(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	externalAccountKey := &publiccapb.ExternalAccountKey{}

	client, err := publicca.NewPublicCertificateAuthorityClient(ctx)
	if err != nil {
		return fmt.Errorf("NewPublicCertificateAuthorityClient failed: %w", err)
	}
	defer client.Close()

	req := &publiccapb.CreateExternalAccountKeyRequest{
		Parent:             parent,
		ExternalAccountKey: externalAccountKey,
	}

	response, err := client.CreateExternalAccountKey(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateExternalAccountKey failed: %w", err)
	}

	fmt.Fprintf(w, "Created External Account Key: %s\n", response.GetName())
	fmt.Fprintf(w, "Key ID: %s\n", response.GetKeyId())
	fmt.Fprintf(w, "B64 MAC Key: %s\n", response.GetB64MacKey())

	return nil
}

// [END publicca_v1beta1_publiccertificateauthorityservice_externalaccountkey_create]
