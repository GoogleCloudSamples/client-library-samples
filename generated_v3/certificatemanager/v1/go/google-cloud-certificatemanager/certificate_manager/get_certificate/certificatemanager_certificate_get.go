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

// [START certificatemanager_v1_certificatemanager_certificate_get]

import (
	"context"
	"fmt"
	"io"

	certificatemanager "cloud.google.com/go/certificatemanager/apiv1"
	"cloud.google.com/go/certificatemanager/apiv1/certificatemanagerpb"
)

// getCertificate retrieves the specified certificate.
func getCertificate(ctx context.Context, w io.Writer, projectID string, locationID string, certificateID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/certificates/%s", projectID, locationID, certificateID)

	client, err := certificatemanager.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &certificatemanagerpb.GetCertificateRequest{
		Name: name,
	}

	certificate, err := client.GetCertificate(ctx, req)
	if err != nil {
		return fmt.Errorf("GetCertificate failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved certificate: %s\n", certificate.GetName())
	return nil
}

// [END certificatemanager_v1_certificatemanager_certificate_get]
