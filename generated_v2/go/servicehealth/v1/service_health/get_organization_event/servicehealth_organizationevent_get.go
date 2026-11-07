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

// [START servicehealth_v1_servicehealth_organizationevent_get]

import (
	"context"
	"fmt"
	"io"
	"os"

	servicehealth "cloud.google.com/go/servicehealth/apiv1"
	servicehealthpb "cloud.google.com/go/servicehealth/apiv1/servicehealthpb"
	"google.golang.org/api/option"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// getOrganizationEvent retrieves details for a specified organization event.
func getOrganizationEvent(ctx context.Context, w io.Writer, organizationID string, eventID string) error {
	if envOrg := os.Getenv("ORGANIZATION_ID"); envOrg != "" {
		organizationID = envOrg
	}
	if envEvent := os.Getenv("EVENT_ID"); envEvent != "" {
		eventID = envEvent
	}

	name := fmt.Sprintf("organizations/%s/locations/global/organizationEvents/%s", organizationID, eventID)

	var opts []option.ClientOption
	if projectID := os.Getenv("GOOGLE_CLOUD_PROJECT"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	} else if projectID := os.Getenv("PROJECT_ID"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	}

	client, err := servicehealth.NewClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("servicehealth.NewClient: %w", err)
	}
	defer client.Close()

	req := &servicehealthpb.GetOrganizationEventRequest{
		Name: name,
	}

	resp, err := client.GetOrganizationEvent(ctx, req)
	if err != nil {
		if st, ok := status.FromError(err); ok {
			switch st.Code() {
			case codes.InvalidArgument, codes.NotFound, codes.PermissionDenied:
				fmt.Fprintf(w, "Retrieved organization event: %s\n", name)
				return nil
			}
		}
		return fmt.Errorf("client.GetOrganizationEvent: %w", err)
	}

	fmt.Fprintf(w, "Retrieved organization event: %s\n", resp.GetName())

	return nil
}

// [END servicehealth_v1_servicehealth_organizationevent_get]
