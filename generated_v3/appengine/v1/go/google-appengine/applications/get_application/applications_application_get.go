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

// [START appengine_v1_applications_application_get]

import (
	"context"
	"fmt"
	"io"
	"os"
	"strings"

	appengine "cloud.google.com/go/appengine/apiv1"
	appenginepb "cloud.google.com/go/appengine/apiv1/appenginepb"
	"google.golang.org/genproto/googleapis/rpc/errdetails"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// getApplication retrieves the details of an App Engine application.
func getApplication(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("GCLOUD_PROJECT")
	}
	if projectID == "" {
		return fmt.Errorf("GOOGLE_CLOUD_PROJECT environment variable not set")
	}

	client, err := appengine.NewApplicationsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewApplicationsClient: %w", err)
	}
	defer client.Close()

	req := &appenginepb.GetApplicationRequest{
		Name: fmt.Sprintf("apps/%s", projectID),
	}

	app, err := client.GetApplication(ctx, req)
	if err != nil {
		// Handle environments where the App Engine Admin API is disabled or the app does not exist.
		if s, ok := status.FromError(err); ok {
			if s.Code() == codes.NotFound {
				fmt.Fprintf(w, "Application not found for project: %s\n", projectID)
				return nil
			}
			for _, detail := range s.Details() {
				if info, ok := detail.(*errdetails.ErrorInfo); ok && info.GetReason() == "SERVICE_DISABLED" {
					fmt.Fprintf(w, "App Engine Admin API is disabled for project %s\n", projectID)
					return nil
				}
			}
		}
		if strings.Contains(err.Error(), "SERVICE_DISABLED") || strings.Contains(err.Error(), "has not been used in project") {
			fmt.Fprintf(w, "App Engine Admin API is disabled for project %s\n", projectID)
			return nil
		}
		return fmt.Errorf("GetApplication: %w", err)
	}

	fmt.Fprintf(w, "Application Name: %s\n", app.GetName())
	fmt.Fprintf(w, "Location: %s\n", app.GetLocationId())
	fmt.Fprintf(w, "Default Hostname: %s\n", app.GetDefaultHostname())

	return nil
}

// [END appengine_v1_applications_application_get]
