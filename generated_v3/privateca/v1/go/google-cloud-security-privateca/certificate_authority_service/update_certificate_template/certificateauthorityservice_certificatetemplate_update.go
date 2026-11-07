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

// [START privateca_v1_certificateauthorityservice_certificatetemplate_update]

import (
	"context"
	"fmt"
	"io"

	privateca "cloud.google.com/go/security/privateca/apiv1"
	privatecapb "cloud.google.com/go/security/privateca/apiv1/privatecapb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// Use the UpdateCertificateTemplate method.
func updateCertificateTemplate(ctx context.Context, w io.Writer, projectID string, locationID string, certificateTemplateID string) error {
	certificateTemplate := &privatecapb.CertificateTemplate{
		Name:        fmt.Sprintf("projects/%s/locations/%s/certificateTemplates/%s", projectID, locationID, certificateTemplateID),
		Description: "Updated certificate template description",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := privateca.NewCertificateAuthorityClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCertificateAuthorityClient failed: %w", err)
	}
	defer client.Close()

	req := &privatecapb.UpdateCertificateTemplateRequest{
		CertificateTemplate: certificateTemplate,
		UpdateMask:          updateMask,
	}

	op, err := client.UpdateCertificateTemplate(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateCertificateTemplate failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated certificate template: %s\n", resp.GetName())
	return nil
}

// [END privateca_v1_certificateauthorityservice_certificatetemplate_update]
