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

// [START certificatemanager_v1_certificatemanager_certificatemaps_list]

import (
	"context"
	"fmt"
	"io"

	certificatemanager "cloud.google.com/go/certificatemanager/apiv1"
	"cloud.google.com/go/certificatemanager/apiv1/certificatemanagerpb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// listCertificateMaps lists all certificate maps in the specified project and location.
func listCertificateMaps(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	var opts []option.ClientOption
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-certificatemanager.googleapis.com:443", locationID)))
	}

	client, err := certificatemanager.NewClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("certificatemanager.NewClient: %w", err)
	}
	defer client.Close()

	req := &certificatemanagerpb.ListCertificateMapsRequest{
		Parent: parent,
	}

	it := client.ListCertificateMaps(ctx, req)
	for {
		certMap, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate certificate maps: %w", err)
		}

		fmt.Fprintf(w, "Certificate map: %s\n", certMap.GetName())
	}

	return nil
}

// [END certificatemanager_v1_certificatemanager_certificatemaps_list]
