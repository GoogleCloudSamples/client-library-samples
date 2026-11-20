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

// [START privateca_v1_certificateauthorityservice_certificate_update]

import (
	"context"
	"fmt"
	"io"

	privateca "cloud.google.com/go/security/privateca/apiv1"
	privatecapb "cloud.google.com/go/security/privateca/apiv1/privatecapb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateCertificate updates labels on an existing certificate.
func updateCertificate(ctx context.Context, w io.Writer, projectID string, locationID string, caPoolID string, certificateID string) error {
	certificateResourceName := fmt.Sprintf("projects/%s/locations/%s/caPools/%s/certificates/%s", projectID, locationID, caPoolID, certificateID)

	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"labels"},
	}
	certificate := &privatecapb.Certificate{
		Name: certificateResourceName,
		Labels: map[string]string{
			"env": "production",
		},
	}

	client, err := privateca.NewCertificateAuthorityClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCertificateAuthorityClient failed: %w", err)
	}
	defer client.Close()

	req := &privatecapb.UpdateCertificateRequest{
		Certificate: certificate,
		UpdateMask:  updateMask,
	}

	resp, err := client.UpdateCertificate(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateCertificate failed: %w", err)
	}

	fmt.Fprintf(w, "Updated certificate: %s\n", resp.GetName())
	return nil
}

// [END privateca_v1_certificateauthorityservice_certificate_update]
