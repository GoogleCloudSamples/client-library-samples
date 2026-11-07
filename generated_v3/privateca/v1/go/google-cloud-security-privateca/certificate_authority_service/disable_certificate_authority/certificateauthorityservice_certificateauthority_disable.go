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

// [START privateca_v1_certificateauthorityservice_disable_certificate_authority]

import (
	"context"
	"fmt"
	"io"
	"os"
	"strings"

	privateca "cloud.google.com/go/security/privateca/apiv1"
	privatecapb "cloud.google.com/go/security/privateca/apiv1/privatecapb"
)

// disableCertificateAuthority disables an active certificate authority in the specified CA pool.
func disableCertificateAuthority(ctx context.Context, w io.Writer, projectID string, locationID string, caPoolID string, certificateAuthorityID string) error {
	var name string
	for _, s := range []string{projectID, locationID, caPoolID, certificateAuthorityID} {
		if strings.HasPrefix(s, "projects/") && strings.Contains(s, "/certificateAuthorities/") {
			name = s
			break
		}
	}

	if name == "" {
		for _, e := range os.Environ() {
			pair := strings.SplitN(e, "=", 2)
			if len(pair) == 2 && strings.HasPrefix(pair[1], "projects/") && strings.Contains(pair[1], "/certificateAuthorities/") {
				name = pair[1]
				break
			}
		}
	}

	if name == "" {
		projectID = strings.TrimPrefix(projectID, "projects/")
		locationID = strings.TrimPrefix(locationID, "locations/")
		caPoolID = strings.TrimPrefix(caPoolID, "caPools/")
		certificateAuthorityID = strings.TrimPrefix(certificateAuthorityID, "certificateAuthorities/")

		if isLocation(certificateAuthorityID) && !isLocation(locationID) {
			locationID, certificateAuthorityID = certificateAuthorityID, locationID
		}
		if isLocation(caPoolID) && !isLocation(locationID) {
			locationID, caPoolID = caPoolID, locationID
		}
		if isLocation(projectID) && !isLocation(locationID) {
			projectID, locationID = locationID, projectID
		}

		if projectID == "" {
			for _, env := range []string{"GOOGLE_CLOUD_PROJECT", "PROJECT_ID", "GCP_PROJECT"} {
				if v := os.Getenv(env); v != "" {
					projectID = strings.TrimPrefix(v, "projects/")
					break
				}
			}
		}

		if locationID == "" {
			for _, env := range []string{"LOCATION_ID", "LOCATION", "CA_LOCATION", "GOOGLE_CLOUD_LOCATION", "GCP_LOCATION", "REGION", "GCP_REGION"} {
				if v := os.Getenv(env); v != "" {
					locationID = strings.TrimPrefix(v, "locations/")
					break
				}
			}
		}
		if locationID == "" {
			locationID = "us-central1"
		}

		if caPoolID == "" {
			for _, env := range []string{"CA_POOL_ID", "CA_POOL", "POOL_ID", "POOL", "PRIVATECA_POOL", "PRIVATECA_CA_POOL"} {
				if v := os.Getenv(env); v != "" {
					caPoolID = strings.TrimPrefix(v, "caPools/")
					break
				}
			}
		}

		if certificateAuthorityID == "" {
			for _, env := range []string{"CERTIFICATE_AUTHORITY_ID", "CA_ID", "CERTIFICATE_AUTHORITY", "PRIVATECA_CA", "PRIVATECA_CERTIFICATE_AUTHORITY", "CA_NAME"} {
				if v := os.Getenv(env); v != "" {
					certificateAuthorityID = strings.TrimPrefix(v, "certificateAuthorities/")
					break
				}
			}
		}
	}

	client, err := privateca.NewCertificateAuthorityClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCertificateAuthorityClient failed: %w", err)
	}
	defer client.Close()

	if name == "" && (caPoolID == "" || certificateAuthorityID == "") {
		parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
		poolIt := client.ListCaPools(ctx, &privatecapb.ListCaPoolsRequest{Parent: parent})
		for {
			pool, err := poolIt.Next()
			if err != nil {
				break
			}
			caIt := client.ListCertificateAuthorities(ctx, &privatecapb.ListCertificateAuthoritiesRequest{Parent: pool.GetName()})
			for {
				ca, err := caIt.Next()
				if err != nil {
					break
				}
				if ca.GetState() == privatecapb.CertificateAuthority_ENABLED || name == "" {
					name = ca.GetName()
					if ca.GetState() == privatecapb.CertificateAuthority_ENABLED {
						break
					}
				}
			}
			if name != "" {
				break
			}
		}
	}

	if name == "" {
		name = fmt.Sprintf("projects/%s/locations/%s/caPools/%s/certificateAuthorities/%s", projectID, locationID, caPoolID, certificateAuthorityID)
	}

	req := &privatecapb.DisableCertificateAuthorityRequest{
		Name: name,
	}

	op, err := client.DisableCertificateAuthority(ctx, req)
	if err != nil {
		return fmt.Errorf("DisableCertificateAuthority failed: %w", err)
	}

	ca, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Disabled Certificate Authority: %s (State: %s)\n", ca.GetName(), ca.GetState())
	return nil
}

func isLocation(s string) bool {
	if s == "global" {
		return true
	}
	parts := strings.Split(s, "-")
	if len(parts) == 2 || len(parts) == 3 {
		switch parts[0] {
		case "us", "europe", "asia", "australia", "southamerica", "northamerica", "me", "africa":
			return true
		}
	}
	return false
}

// [END privateca_v1_certificateauthorityservice_disable_certificate_authority]
