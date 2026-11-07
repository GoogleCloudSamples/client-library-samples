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

// [START certificatemanager_v1_certificatemanager_certificate_update]

import (
	"context"
	"fmt"
	"io"

	certificatemanager "cloud.google.com/go/certificatemanager/apiv1"
	certificatemanagerpb "cloud.google.com/go/certificatemanager/apiv1/certificatemanagerpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateCertificate updates the description of an existing certificate.
func updateCertificate(ctx context.Context, w io.Writer, projectID string, locationID string, certificateID string) error {
	client, err := certificatemanager.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}
	certificate := &certificatemanagerpb.Certificate{
		Name:        fmt.Sprintf("projects/%s/locations/%s/certificates/%s", projectID, locationID, certificateID),
		Description: "Updated certificate description",
	}

	req := &certificatemanagerpb.UpdateCertificateRequest{
		Certificate: certificate,
		UpdateMask:  updateMask,
	}

	op, err := client.UpdateCertificate(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateCertificate failed: %w", err)
	}

	// Wait for the long-running operation to complete.
	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated certificate: %s\n", resp.GetName())
	return nil
}

// [END certificatemanager_v1_certificatemanager_certificate_update]
