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

// [START privateca_v1_certificateauthorityservice_certificateauthority_update]

import (
	"context"
	"fmt"
	"io"

	privateca "cloud.google.com/go/security/privateca/apiv1"
	privatecapb "cloud.google.com/go/security/privateca/apiv1/privatecapb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateCertificateAuthority updates labels on an existing Certificate Authority.
func updateCertificateAuthority(ctx context.Context, w io.Writer, projectID string, locationID string, caPoolID string, certificateAuthorityID string) error {
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"labels"},
	}
	certificateAuthority := &privatecapb.CertificateAuthority{
		Name: fmt.Sprintf("projects/%s/locations/%s/caPools/%s/certificateAuthorities/%s", projectID, locationID, caPoolID, certificateAuthorityID),
		Labels: map[string]string{
			"env": "test",
		},
	}

	client, err := privateca.NewCertificateAuthorityClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCertificateAuthorityClient failed: %w", err)
	}
	defer client.Close()

	req := &privatecapb.UpdateCertificateAuthorityRequest{
		CertificateAuthority: certificateAuthority,
		UpdateMask:           updateMask,
	}

	op, err := client.UpdateCertificateAuthority(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateCertificateAuthority failed: %w", err)
	}

	ca, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated Certificate Authority: %s\n", ca.GetName())
	return nil
}

// [END privateca_v1_certificateauthorityservice_certificateauthority_update]
