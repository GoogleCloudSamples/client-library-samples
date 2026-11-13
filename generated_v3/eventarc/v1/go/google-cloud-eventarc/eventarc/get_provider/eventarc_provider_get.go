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

// [START eventarc_v1_eventarc_provider_get]

import (
	"context"
	"fmt"
	"io"
	"os"

	eventarc "cloud.google.com/go/eventarc/apiv1"
	"cloud.google.com/go/eventarc/apiv1/eventarcpb"
)

// getProvider retrieves an Eventarc event provider.
func getProvider(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = "example-project-id"
	}
	location := os.Getenv("GOOGLE_CLOUD_LOCATION")
	if location == "" {
		location = os.Getenv("GOOGLE_CLOUD_REGION")
	}
	if location == "" {
		location = "us-central1"
	}

	name := fmt.Sprintf("projects/%s/locations/%s/providers/storage.googleapis.com", projectID, location)

	client, err := eventarc.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &eventarcpb.GetProviderRequest{
		Name: name,
	}

	response, err := client.GetProvider(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetProvider failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved provider: %s\n", response.GetName())

	return nil
}

// [END eventarc_v1_eventarc_provider_get]
