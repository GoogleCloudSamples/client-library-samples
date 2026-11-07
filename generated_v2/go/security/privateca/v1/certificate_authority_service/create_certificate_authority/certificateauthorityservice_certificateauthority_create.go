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

// [START privateca_v1_certificateauthorityservice_certificateauthority_create]

import (
	"context"
	"fmt"
	"io"

	privateca "cloud.google.com/go/security/privateca/apiv1"
	privatecapb "cloud.google.com/go/security/privateca/apiv1/privatecapb"
	"google.golang.org/protobuf/types/known/durationpb"
)

// Use the CreateCertificateAuthority method.
func createCertificateAuthority(ctx context.Context, w io.Writer, projectID string, locationID string, caPoolID string, certificateAuthorityID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/caPools/%s", projectID, locationID, caPoolID)

	subjectConfig := &privatecapb.CertificateConfig_SubjectConfig{
		Subject: &privatecapb.Subject{
			CommonName:   "Example Root CA",
			Organization: "Example Organization",
		},
	}
	isCA := true
	x509Config := &privatecapb.X509Parameters{
		CaOptions: &privatecapb.X509Parameters_CaOptions{
			IsCa: &isCA,
		},
		KeyUsage: &privatecapb.KeyUsage{
			BaseKeyUsage: &privatecapb.KeyUsage_KeyUsageOptions{
				CertSign: true,
				CrlSign:  true,
			},
		},
	}
	keySpec := &privatecapb.CertificateAuthority_KeyVersionSpec{
		KeyVersion: &privatecapb.CertificateAuthority_KeyVersionSpec_Algorithm{
			Algorithm: privatecapb.CertificateAuthority_RSA_PSS_2048_SHA256,
		},
	}
	certificateAuthority := &privatecapb.CertificateAuthority{
		Type:     privatecapb.CertificateAuthority_SELF_SIGNED,
		Lifetime: &durationpb.Duration{Seconds: 315360000},
		Config: &privatecapb.CertificateConfig{
			SubjectConfig: subjectConfig,
			X509Config:    x509Config,
		},
		KeySpec: keySpec,
	}

	client, err := privateca.NewCertificateAuthorityClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCertificateAuthorityClient failed: %w", err)
	}
	defer client.Close()

	req := &privatecapb.CreateCertificateAuthorityRequest{
		Parent:                 parent,
		CertificateAuthorityId: certificateAuthorityID,
		CertificateAuthority:   certificateAuthority,
	}

	op, err := client.CreateCertificateAuthority(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateCertificateAuthority failed: %w", err)
	}

	ca, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("CreateCertificateAuthority wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created Certificate Authority: %s\n", ca.GetName())
	return nil
}

// [END privateca_v1_certificateauthorityservice_certificateauthority_create]
