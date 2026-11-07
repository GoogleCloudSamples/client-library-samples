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

// [START networksecurity_v1beta1_networksecurity_servertlspolicy_create]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1beta1"
	networksecuritypb "cloud.google.com/go/networksecurity/apiv1beta1/networksecuritypb"
)

// createServerTlsPolicy creates a ServerTlsPolicy resource.
func createServerTlsPolicy(ctx context.Context, w io.Writer, projectID string, locationID string, serverTlsPolicyID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	providerInstance := &networksecuritypb.CertificateProviderInstance{
		PluginInstance: "google_cloud_private_spiffe",
	}
	certProvider := &networksecuritypb.CertificateProvider{
		Type: &networksecuritypb.CertificateProvider_CertificateProviderInstance{
			CertificateProviderInstance: providerInstance,
		},
	}
	serverTlsPolicy := &networksecuritypb.ServerTlsPolicy{
		Description:       "Example Server TLS Policy",
		ServerCertificate: certProvider,
	}

	client, err := networksecurity.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.CreateServerTlsPolicyRequest{
		Parent:            parent,
		ServerTlsPolicyId: serverTlsPolicyID,
		ServerTlsPolicy:   serverTlsPolicy,
	}

	op, err := client.CreateServerTlsPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateServerTlsPolicy failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created ServerTlsPolicy: %s\n", resp.GetName())
	return nil
}

// [END networksecurity_v1beta1_networksecurity_servertlspolicy_create]
