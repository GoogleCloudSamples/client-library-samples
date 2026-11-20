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

// [START privateca_v1_certificateauthorityservice_certificatetemplate_create]

import (
	"context"
	"fmt"
	"io"

	privateca "cloud.google.com/go/security/privateca/apiv1"
	"cloud.google.com/go/security/privateca/apiv1/privatecapb"
)

// createCertificateTemplate creates a new certificate template in the specified project and location.
func createCertificateTemplate(ctx context.Context, w io.Writer, projectID string, locationID string, certificateTemplateID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	certificateTemplate := &privatecapb.CertificateTemplate{
		Description: "An example certificate template",
	}

	client, err := privateca.NewCertificateAuthorityClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCertificateAuthorityClient failed: %w", err)
	}
	defer client.Close()

	req := &privatecapb.CreateCertificateTemplateRequest{
		Parent:                parent,
		CertificateTemplateId: certificateTemplateID,
		CertificateTemplate:   certificateTemplate,
	}

	op, err := client.CreateCertificateTemplate(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateCertificateTemplate failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created certificate template: %s\n", resp.GetName())
	return nil
}

// [END privateca_v1_certificateauthorityservice_certificatetemplate_create]
