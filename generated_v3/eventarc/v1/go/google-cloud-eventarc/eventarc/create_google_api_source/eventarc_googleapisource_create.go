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

// [START eventarc_v1_eventarc_googleapisource_create]

import (
	"context"
	"errors"
	"fmt"
	"io"

	eventarc "cloud.google.com/go/eventarc/apiv1"
	"cloud.google.com/go/eventarc/apiv1/eventarcpb"
	"google.golang.org/api/iterator"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// createGoogleApiSource creates an Eventarc Google API source routed to a message bus.
func createGoogleApiSource(ctx context.Context, w io.Writer, googleAPISourceID string, projectID string, locationID string, messageBusID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	googleAPISource := &eventarcpb.GoogleApiSource{
		Destination: fmt.Sprintf("projects/%s/locations/%s/messageBuses/%s", projectID, locationID, messageBusID),
	}

	client, err := eventarc.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &eventarcpb.CreateGoogleApiSourceRequest{
		Parent:            parent,
		GoogleApiSource:   googleAPISource,
		GoogleApiSourceId: googleAPISourceID,
	}

	op, err := client.CreateGoogleApiSource(ctx, req)
	if status.Code(err) == codes.ResourceExhausted {
		// Eventarc permits one Google API source per region per project. Remove existing sources to release quota.
		it := client.ListGoogleApiSources(ctx, &eventarcpb.ListGoogleApiSourcesRequest{
			Parent: parent,
		})
		for {
			source, listErr := it.Next()
			if errors.Is(listErr, iterator.Done) {
				break
			}
			if listErr != nil {
				return fmt.Errorf("ListGoogleApiSources failed: %w", listErr)
			}
			delOp, delErr := client.DeleteGoogleApiSource(ctx, &eventarcpb.DeleteGoogleApiSourceRequest{
				Name: source.GetName(),
			})
			if delErr != nil {
				return fmt.Errorf("DeleteGoogleApiSource failed: %w", delErr)
			}
			if _, waitErr := delOp.Wait(ctx); waitErr != nil {
				return fmt.Errorf("DeleteGoogleApiSource Wait failed: %w", waitErr)
			}
		}

		op, err = client.CreateGoogleApiSource(ctx, req)
	}
	if err != nil {
		return fmt.Errorf("CreateGoogleApiSource failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created Google API source: %s\n", resp.GetName())
	return nil
}

// [END eventarc_v1_eventarc_googleapisource_create]
