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

// [START certificatemanager_v1_certificatemanager_certificatemap_update]

import (
	"context"
	"fmt"
	"io"
	"os"
	"strings"

	certificatemanager "cloud.google.com/go/certificatemanager/apiv1"
	certificatemanagerpb "cloud.google.com/go/certificatemanager/apiv1/certificatemanagerpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateCertificateMap updates an existing certificate map description.
func updateCertificateMap(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("GCP_PROJECT")
	}
	if projectID == "" {
		projectID = os.Getenv("GCLOUD_PROJECT")
	}
	if projectID == "" {
		projectID = "example-project-id"
	}

	certificateMapID := os.Getenv("CERTIFICATE_MAP_ID")
	if certificateMapID == "" {
		certificateMapID = os.Getenv("CERTIFICATE_MAP")
	}
	if certificateMapID == "" {
		certificateMapID = "example-certificate-map-id"
	}

	certificateMapName := fmt.Sprintf("projects/%s/locations/global/certificateMaps/%s", projectID, certificateMapID)
	if envName := os.Getenv("CERTIFICATE_MAP_NAME"); envName != "" {
		certificateMapName = envName
	} else if strings.HasPrefix(certificateMapID, "projects/") {
		certificateMapName = certificateMapID
	}

	certificateMap := &certificatemanagerpb.CertificateMap{
		Name:        certificateMapName,
		Description: "Updated certificate map description",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := certificatemanager.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &certificatemanagerpb.UpdateCertificateMapRequest{
		CertificateMap: certificateMap,
		UpdateMask:     updateMask,
	}

	op, err := client.UpdateCertificateMap(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateCertificateMap failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated certificate map: %s\n", resp.GetName())
	return nil
}

// [END certificatemanager_v1_certificatemanager_certificatemap_update]
